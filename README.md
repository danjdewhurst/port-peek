<div align="center">

# port-peek

A tiny CLI to inspect local TCP listeners and show which process owns each port.

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933?logo=nodedotjs&logoColor=white)](#requirements)
[![Bun](https://img.shields.io/badge/bun-%3E%3D1.0.0-000000?logo=bun&logoColor=white)](#requirements)
[![Tests](https://github.com/danjdewhurst/port-peek/actions/workflows/tests.yml/badge.svg)](https://github.com/danjdewhurst/port-peek/actions/workflows/tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## Why

When a local app fails to start with “port already in use”, you want answers fast:

- Which ports are listening?
- Which process is holding a port?
- Can I filter to just one or two ports?

`port-peek` gives quick, readable answers from your terminal.

---

## Features

- Shows local TCP listeners with process + PID
- Filter by one or more ports (`--port` repeatable)
- JSON output for scripting (`--json`)
- Minimal, dependency-free Node CLI
- Works with Node.js and Bun

---

## Requirements

- Linux (uses `ss -ltnpH`)
- Node.js `>=18` or Bun `>=1.0.0`

---

## Install / Run

### Local (npm)

```bash
npm install
node bin/port-peek.js
```

### Local (Bun)

```bash
bun install
bun run ./bin/port-peek.js
```

### Global usage

```bash
npm link
port-peek --help
```

---

## Usage

```bash
port-peek [--port <n>] [--json] [--help]
```

### Options

- `--port <n>` Filter by a port (repeatable)
- `--json` Output JSON
- `--help` Show usage help

---

## Examples

```bash
# Show all listeners
port-peek

# Only show port 3000
port-peek --port 3000

# Multiple ports + machine-readable output
port-peek --port 3000 --port 8080 --json
```

---

## Development

```bash
npm test
bun test
```

---

## License

MIT © Daniel Dewhurst
