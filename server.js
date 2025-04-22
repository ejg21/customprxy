
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import { rewriteHTML } from './uv/rewriter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 8080;

app.use('/uv', express.static(path.join(__dirname, 'uv')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/proy/*', async (req, res) => {
  const targetUrl = req.params[0];
  if (!targetUrl.startsWith('http')) return res.send('Invalid URL');

  try {
    const response = await fetch(targetUrl);
    let contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('text/html')) {
      let html = await response.text();
      let rewritten = rewriteHTML(html, '/proy/', targetUrl);
      res.send(rewritten);
    } else {
      response.body.pipe(res);
    }
  } catch (err) {
    res.status(500).send(`Proy Error: ${err.message}`);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Proy running at http://localhost:${PORT}`));
    