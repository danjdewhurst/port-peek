# port-peek

`port-peek` is a tiny CLI to inspect local TCP listening ports and show which process owns them.

## Usage

```bash
port-peek
port-peek --port 3000
port-peek --port 3000 --port 8080 --json
```

## Notes
- Uses `ss -ltnpH` under the hood (Linux).
- Great for quickly seeing what's bound on your machine.
