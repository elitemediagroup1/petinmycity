// Lucy AI chat proxy for petsinmycity.com
// Forwards browser messages to api.anthropic.com using ANTHROPIC_API_KEY env var.
// Browser must never see the key.

const https = require('https');

const SYSTEM_PROMPT = [
  "You are Lucy, a friendly AI pet advisor for PetsInMyCity.com. You help pet owners with any pet-related question.",
  "",
  "Your personality:",
  "- Warm, friendly, knowledgeable",
  "- You love animals genuinely",
  "- Never clinical or corporate",
  "- Use the pet owner's pet name when they mention it",
  "- Keep responses concise - 2 to 4 sentences max per message",
  "- Always end with a relevant resource or next step",
  "",
  "When recommending services always use these links:",
  "- Pet insurance comparison: /go/petinsurer/ or mention petsinmycity.com/pet-insurance/",
  "- Dog walking: /go/wagwalking/",
  "- Boarding/sitting: /go/rover/",
  "- Adoption: /go/petfinder/",
  "- Food/supplies: /go/chewy/",
  "- Monthly treats: /go/barkbox/",
  "- DNA test: /go/embark/",
  "- Find a vet: petsinmycity.com/find-a-vet/",
  "",
  "When recommending insurance be specific:",
  "- Rescue/adopted pets: Fetch (/go/fetch/)",
  "- Want no limits: Trupanion (/go/trupanion/)",
  "- Budget conscious: Pets Best",
  "- Comparing options: PetInsurer (/go/petinsurer/)",
  "",
  "Format any links as: [Link text](url)",
  "These will be rendered as clickable buttons in the chat interface.",
  "",
  "Never recommend going to Google. Always keep users on petsinmycity.com or route to a partner via /go/ links.",
  "",
  "Topics you handle:",
  "- Pet insurance questions and recommendations",
  "- Finding local vets by area",
  "- Dog walking and boarding options",
  "- Adoption resources and advice",
  "- Pet health questions (general guidance, always recommend seeing a vet for medical issues)",
  "- Pet food and nutrition",
  "- Training tips",
  "- Breed information",
  "- New pet owner guidance",
  "- Any other pet topic"
].join('\n');

const MODEL = process.env.LUCY_MODEL || 'claude-sonnet-4-20250514';
const MAX_TOKENS = 1024;

exports.handler = async function (event) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: 'Method Not Allowed' };
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: Object.assign({ 'Content-Type': 'application/json' }, cors),
      body: JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured on the server. Set it in Netlify dashboard > Site settings > Environment variables.' })
    };
  }
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (e) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }
  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (!messages || !messages.length) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'messages array required' }) };
  }
  // Light sanitization: cap to last 30 messages and trim each user/assistant text to 4000 chars
  const trimmed = messages.slice(-30).map(function (m) {
    const role = (m.role === 'assistant') ? 'assistant' : 'user';
    const content = typeof m.content === 'string' ? m.content.slice(0, 4000) : '';
    return { role: role, content: content };
  }).filter(function (m) { return m.content.length > 0; });
  const payload = JSON.stringify({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: trimmed
  });
  const result = await new Promise(function (resolve) {
    const req = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 30000
    }, function (res) {
      let data = '';
      res.on('data', function (c) { data += c; });
      res.on('end', function () { resolve({ status: res.statusCode, body: data }); });
    });
    req.on('error', function (err) { resolve({ status: 502, body: JSON.stringify({ error: 'Upstream error: ' + err.message }) }); });
    req.on('timeout', function () { req.destroy(); resolve({ status: 504, body: JSON.stringify({ error: 'Upstream timeout' }) }); });
    req.write(payload);
    req.end();
  });
  let text = '';
  try {
    const parsed = JSON.parse(result.body);
    if (result.status >= 200 && result.status < 300 && parsed.content && parsed.content[0] && parsed.content[0].text) {
      text = parsed.content[0].text;
    } else if (parsed.error && parsed.error.message) {
      text = '';
      return {
        statusCode: result.status,
        headers: Object.assign({ 'Content-Type': 'application/json' }, cors),
        body: JSON.stringify({ error: parsed.error.message })
      };
    }
  } catch (e) {
    return {
      statusCode: 502,
      headers: Object.assign({ 'Content-Type': 'application/json' }, cors),
      body: JSON.stringify({ error: 'Bad upstream response' })
    };
  }
  return {
    statusCode: 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, cors),
    body: JSON.stringify({ reply: text })
  };
};
