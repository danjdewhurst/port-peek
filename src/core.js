const { execSync } = require('node:child_process');

function parseSsOutput(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const out = [];

  for (const line of lines) {
    // Example: LISTEN 0 4096 127.0.0.1:3000 0.0.0.0:* users:(("node",pid=1234,fd=23))
    const m = line.match(/^(?:LISTEN\s+\d+\s+\d+\s+)?([^\s]+):(\d+)\s+[^\s]+\s+users:\(\((.+)\)\)$/);
    if (!m) continue;

    const host = m[1];
    const port = Number(m[2]);
    const proc = m[3].match(/^"([^"]+)"/)?.[1] || 'unknown';
    const pid = Number(m[3].match(/pid=(\d+)/)?.[1] || 0);

    out.push({ host, port, process: proc, pid });
  }

  return out;
}

function getListeners() {
  const raw = execSync('ss -ltnpH', { encoding: 'utf8' });
  return parseSsOutput(raw);
}

function filterByPort(items, ports) {
  if (!ports?.length) return items;
  const set = new Set(ports.map(Number));
  return items.filter((x) => set.has(x.port));
}

module.exports = { parseSsOutput, getListeners, filterByPort };
