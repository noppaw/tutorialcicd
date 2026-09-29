const { test, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let server;
let baseUrl;

before(() => {
  // port 0 = let the OS pick a free port
  server = app.listen(0);
  baseUrl = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('GET / returns hello message', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.message, 'Hello from CI/CD tutorial!');
});

test('GET /health returns ok', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});

test('GET /api/add adds two numbers', async () => {
  const res = await fetch(`${baseUrl}/api/add?a=2&b=3`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { result: 6 });
});

test('GET /api/add rejects non-numbers', async () => {
  const res = await fetch(`${baseUrl}/api/add?a=x&b=3`);
  assert.strictEqual(res.status, 400);
});
