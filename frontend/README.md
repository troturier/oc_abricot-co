# Abricot — frontend

Next.js 16 (App Router, TypeScript) interface of Abricot. See the [root README](../README.md)
for the setup of the whole project and [VALIDATION.md](../VALIDATION.md) for the checks.

```bash
cp .env.example .env.local   # then fill MISTRAL_API_KEY
npm install
npm run dev                  # http://localhost:3001 (the backend must run on :8000)
```

| Script                                        | Purpose                                                              |
| --------------------------------------------- | -------------------------------------------------------------------- |
| `npm run dev` / `build` / `start`             | Development server, production build, production server (port 3001)  |
| `npm run lint` / `typecheck` / `format:check` | ESLint, TypeScript, Prettier                                         |
| `npm test`                                    | Unit + integration tests (Vitest)                                    |
| `npm run test:e2e`                            | End-to-end tests (Playwright, real backend on a throw-away database) |
| `npm run test:all`                            | Everything above, in order                                           |
