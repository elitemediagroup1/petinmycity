// IndexNow relay for petsinmycity.com
// Accepts {urls:[...]} or {urlList:[...]} from browser; injects host + key
// server-side before forwarding to Bing IndexNow API.

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "7bdb0c4ae9f843dcb8c845c0c898c8c6";
const INDEXNOW_HOST = process.env.INDEXNOW_HOST || "petsinmycity.com";
const KEY_LOCATION = "https://" + INDEXNOW_HOST + "/" + INDEXNOW_KEY + ".txt";

const https = require('https');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const urls = body.urls || body.urlList || [];

    if (!urls.length) {
      return { statusCode: 400, body: 'No URLs provided' };
    }

    const payload = JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    });

    return new Promise((resolve) => {
      const options = {
        hostname: 'api.indexnow.org',
        path: '/indexnow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: data || 'Submitted successfully'
          });
        });
      });

      req.on('error', (err) => {
        resolve({ statusCode: 500, body: err.message });
      });

      req.write(payload);
      req.end();
    });
  } catch(err) {
    return { statusCode: 500, body: err.message };
  }
};
