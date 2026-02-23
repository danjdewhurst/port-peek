const { getListeners, filterByPort } = require('./core');

function help() {
  return `port-peek\n\nUsage:\n  port-peek [--port <n>] [--json] [--help]\n\nOptions:\n  --port <n>   Filter to a specific port (repeatable)\n  --json       Output JSON\n  --help       Show this help\n`;
}

function parseArgs(argv) {
  const opts = { ports: [], json: false, help: false };

  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--help' || a === '-h') opts.help = true;
    else if (a === '--json') opts.json = true;
    else if (a === '--port') {
      const val = argv[++i];
      if (!val || Number.isNaN(Number(val))) throw new Error('Invalid --port value');
      opts.ports.push(Number(val));
    } else if (a.startsWith('--port=')) {
      const val = a.split('=')[1];
      if (!val || Number.isNaN(Number(val))) throw new Error('Invalid --port value');
      opts.ports.push(Number(val));
    } else throw new Error(`Unknown argument: ${a}`);
  }

  return opts;
}

function formatTable(rows) {
  if (!rows.length) return 'No listeners found.';
  return [
    'PORT  HOST            PROCESS      PID',
    ...rows.map((r) => `${String(r.port).padEnd(5)} ${r.host.padEnd(15)} ${r.process.padEnd(12)} ${String(r.pid)}`)
  ].join('\n');
}

function run(argv = process.argv.slice(2), deps = {}) {
  const out = deps.write || ((t) => process.stdout.write(`${t}\n`));
  const opts = parseArgs(argv);
  if (opts.help) {
    out(help().trimEnd());
    return 0;
  }

  const listeners = (deps.getListeners || getListeners)();
  const filtered = filterByPort(listeners, opts.ports);

  if (opts.json) out(JSON.stringify(filtered, null, 2));
  else out(formatTable(filtered));

  return 0;
}

module.exports = { help, parseArgs, formatTable, run };
