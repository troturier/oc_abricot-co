# Abricot — AI-powered project management SaaS

Abricot is a collaborative project management tool for freelancers: projects, tasks, comments,
personal dashboard (list, kanban, projects) and **AI task generation** with a RAG pipeline
(LlamaIndex.TS + Mistral) that takes the existing tasks of the project into account.

OpenClassrooms "AI developer" path — project 11. The backend was provided; this repository adds
the Next.js frontend and the AI feature.

| Folder                              | Content                                                       |
| ----------------------------------- | ------------------------------------------------------------- |
| [`backend/`](backend/README.md)     | Provided REST API: Express, Prisma, SQLite, JWT, Swagger      |
| [`frontend/`](frontend/README.md)   | Next.js 16 app (App Router, TypeScript, Tailwind CSS 4)       |
| [`design/`](design/specs/README.md) | Figma mockup export: screens, per-screen specs, tokens, icons |
| [`VALIDATION.md`](VALIDATION.md)    | Checks performed for each step and how to re-run them         |

## Getting started

Requirements: Node.js 22, npm 10+.

```bash
# 1. Backend — http://localhost:8000 (Swagger: /api-docs)
cd backend
cp .env.example .env          # set JWT_SECRET to a long random value
npm install
npx prisma generate
npx prisma migrate deploy
npm run seed                  # 10 users, password P@ssword123 (alice@example.com, bob@example.com…)
npm run dev
```

```bash
# 2. Frontend — http://localhost:3001
cd frontend
cp .env.example .env.local    # set MISTRAL_API_KEY for the AI feature
npm install
npm run dev
```

## Tests

```bash
cd frontend
npm test              # unit + integration (Vitest)
npm run test:e2e      # end-to-end (Playwright, real backend on a throw-away database)
npm run test:ai       # prompt quality on the real Mistral API (needs MISTRAL_API_KEY)
npm run test:all      # lint + typecheck + unit/integration + e2e
```

## Architecture highlights

- **Backend for frontend**: the browser only talks to Next.js. Server Components and Server Actions
  call the API with the JWT kept in an `httpOnly` cookie; the token and the Mistral key never reach
  client-side JavaScript.
- **Route protection** in `proxy.ts` (optimistic) and in a server-only Data Access Layer
  (authoritative, the backend verifies the JWT).
- **RAG**: existing tasks → LlamaIndex `VectorStoreIndex` (Mistral embeddings) → top-k similar tasks
  injected in the prompt → `mistral-small-latest` → zod-validated JSON → user review → saved in the project.
- **Accessibility**: WCAG 2.1 AA audited with axe-core on every page, keyboard navigation tested,
  contrast-adjusted palette.

The library choices are justified in [VALIDATION.md](VALIDATION.md#libraries-and-why-they-are-there).
