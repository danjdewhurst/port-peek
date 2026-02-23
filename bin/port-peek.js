#!/usr/bin/env node
const { run } = require('../src/cli');

try {
  process.exitCode = run();
} catch (err) {
  process.stderr.write(`port-peek: ${err.message}\n`);
  process.exitCode = 1;
}
