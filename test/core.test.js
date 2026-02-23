const test = require('node:test');
const assert = require('node:assert/strict');
const { parseSsOutput, filterByPort } = require('../src/core');

test('parseSsOutput parses listeners', () => {
  const input = 'LISTEN 0 4096 127.0.0.1:3000 0.0.0.0:* users:(("node",pid=1234,fd=23))';
  const rows = parseSsOutput(input);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].port, 3000);
  assert.equal(rows[0].process, 'node');
  assert.equal(rows[0].pid, 1234);
});

test('filterByPort filters correctly', () => {
  const rows = [{ port: 1 }, { port: 2 }, { port: 3 }];
  assert.deepEqual(filterByPort(rows, [2, 3]), [{ port: 2 }, { port: 3 }]);
});
