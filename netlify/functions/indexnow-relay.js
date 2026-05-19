const https = require('https');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  return new Promise((resolve) => {
    const payload = event.body;

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
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: data || 'Submitted successfully'
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        statusCode: 500,
        body: err.message
      });
    });

    req.write(payload);
    req.end();
  });
};
