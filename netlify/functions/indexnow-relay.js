exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const payload = JSON.parse(event.body);
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });
    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: await response.text()
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};
