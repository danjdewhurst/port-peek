const test = require('node:test');
const assert = require('node:assert/strict');
const { parseArgs, formatTable, run } = require('../src/cli');

test('parseArgs parses ports and json', () => {
  const o = parseArgs(['--port', '3000', '--port=8080', '--json']);
  assert.deepEqual(o, { ports: [3000, 8080], json: true, help: false });
});

test('formatTable handles empty', () => {
  assert.equal(formatTable([]), 'No listeners found.');
});

test('run prints filtered json', () => {
  let printed = '';
  const code = run(['--json', '--port', '3000'], {
    write: (t) => { printed = t; },
    getListeners: () => [
      { host: '127.0.0.1', port: 3000, process: 'node', pid: 1 },
      { host: '0.0.0.0', port: 22, process: 'sshd', pid: 2 }
    ]
  });
  assert.equal(code, 0);
  assert.match(printed, /3000/);
  assert.doesNotMatch(printed, /"port": 22/);
});
