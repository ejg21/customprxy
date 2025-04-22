const express = require('express');
const fetch = require('node-fetch');
const { rewriteHTML } = require('./rewriter');

function proyMiddleware(proyPath = '/proy/') {
  const router = express.Router();

  router.get('*', async (req, res) => {
    const encodedUrl = req.url.slice(1);
    if (!encodedUrl) return res.status(400).send('Bad Request: Missing target URL.');

    const targetUrl = decodeURIComponent(encodedUrl);

    try {
      const response = await fetch(targetUrl);
      let contentType = response.headers.get('content-type');
      let body = await response.text();

      if (contentType && contentType.includes('text/html')) {
        body = rewriteHTML(body, proyPath, targetUrl);
      }

      res.set('content-type', contentType);
      res.send(body);
    } catch (err) {
      res.status(500).send(`Proy Error: \${err.message}`);
    }
  });

  return router;
}

module.exports = { proyMiddleware };
