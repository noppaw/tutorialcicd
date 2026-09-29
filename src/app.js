const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from CI/CD tutorial!' });
});

// Render (and most platforms) poll this to know the app is alive
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/add', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'a and b must be numbers' });
  }
  res.json({ result: a + b });
});

module.exports = app;
