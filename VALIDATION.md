# Validation

This document lists, step by step, what was checked to make sure each step of the mission is
done, and how to re-run the checks. Every automated check can be replayed at any time to detect
regressions (see [Re-running everything](#re-running-everything)).

Last full run: **2026-11-23** — lint ✅, typecheck ✅, Prettier ✅, 91 unit/integration tests ✅,
27 end-to-end tests ✅, AI quality evaluation with the real Mistral model ✅ (3/3), WAVE ✅ (0 error).

Legend: ✅ verified · ⏳ pending · ⚠️ deviation, explained.

---

## Re-running everything

The automated checks do **not** need the development servers: the end-to-end tests start their own
backend and frontend on dedicated ports. One command is enough:

```bash
# Every frontend check (lint, types, unit, integration, end-to-end)
cd backend && npm install && npx prisma generate && cd ../frontend && npm install && npx playwright install chromium && npm run test:all
```

The development servers are only needed to use the application by hand:

```bash
# Terminal 1 — backend on http://localhost:8000 (development database)
cd backend && npx prisma migrate deploy && npm run seed && npm run dev
```

```bash
# Terminal 2 — frontend on http://localhost:3001
cd frontend && npm run dev
```

| Port | Used by                                                     | Override                                                                               |
| ---- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 8000 | development backend (`backend`, `npm run dev`)              | `PORT=8001 npm run dev`, then `API_URL=http://localhost:8001` in `frontend/.env.local` |
| 3001 | development frontend (`frontend`, `npm run dev`)            | `npx next dev --port 3002`                                                             |
| 8010 | backend started by `npm run test:e2e` (throw-away database) | `E2E_BACKEND_PORT=8020 npm run test:e2e`                                               |
| 3010 | production frontend started by `npm run test:e2e`           | `E2E_FRONTEND_PORT=3020 npm run test:e2e`                                              |

### "address already in use" (`EADDRINUSE`)

Another process already listens on the port, usually a server started earlier and not stopped
(a forgotten terminal, an interrupted run). Find it, then stop it or use another port (table above):

```bash
ss -ltnp | grep -E ':(8000|3001|8010|3010)\b'
```

```bash
kill <pid>
```

Playwright refuses to start when 8010 or 3010 is taken (`… is already used, make sure that nothing is
running on the port/url`): it never reuses a server, so that the tests always run on a fresh database
and a fresh build.

| Command (in `frontend/`) | What it checks                                                                                                                                                                     | Duration          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `npm run lint`           | ESLint (Next.js core-web-vitals + TypeScript rules, includes `jsx-a11y` rules)                                                                                                     | ~5 s              |
| `npm run typecheck`      | TypeScript strict mode, typed routes                                                                                                                                               | ~10 s             |
| `npm run format:check`   | Prettier                                                                                                                                                                           | ~3 s              |
| `npm test`               | 91 Vitest tests: `unit` project (jsdom) + `integration` project (Node, MSW-mocked backend)                                                                                         | ~3 s              |
| `npm run test:coverage`  | Same with V8 coverage report in `coverage/`                                                                                                                                        | ~5 s              |
| `npm run test:e2e`       | 27 Playwright tests: starts the **real backend** on a fresh seeded SQLite database (`backend/prisma/e2e.sqlite`, port 8010) and a **production build** of the frontend (port 3010) | ~1 min with build |
| `npm run test:ai`        | Prompt quality evaluation on the **real Mistral API** (skipped without `MISTRAL_API_KEY`)                                                                                          | ~30 s             |

The end-to-end tests never touch the development database and can run while `npm run dev` is up (different ports).

---

## Step 1 — Run the backend

**Goal:** the provided backend runs with its tools (database, seed, Prisma Studio, Swagger).

What was done:

- The backend was moved into `backend/` (the repository now holds `backend/` and `frontend/`).
- `.env` created from `.env.example` with a random 256-bit `JWT_SECRET` (`openssl rand -hex 32`); the file is ignored by Git.

| Check                                                                                                                                                        | Result                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `npm install`, `npx prisma generate`, `npx prisma migrate deploy`                                                                                            | ✅ 2 migrations applied, `npx prisma migrate status` → "Database schema is up to date" |
| `npm run seed`                                                                                                                                               | ✅ 10 users, 5 projects, 17 tasks, comments                                            |
| `GET http://localhost:8000/health`                                                                                                                           | ✅ `{"success":true,"message":"API en ligne"}`                                         |
| `GET http://localhost:8000/api-docs/` (Swagger)                                                                                                              | ✅ HTTP 200                                                                            |
| Every route used by the frontend called with `curl` and a seed account (login, profile, projects, project, tasks, task, comments, dashboard ×3, user search) | ✅ response shapes recorded in `frontend/src/lib/types.ts`                             |

Findings from the backend analysis, handled in the frontend:

- `POST /projects/:id/tasks` ignores `status` → a task created with another status is created then updated (`createTask` action, tested).
- The dashboard routes sort the priority alphabetically (`HIGH < LOW < MEDIUM < URGENT`) → the "most urgent first" order is recomputed (`sortByUrgency`, tested).
- The project list only returns a task count → the progression of the project cards is computed from each project's tasks.
- There is no password reset route → "Mot de passe oublié ?" explains how to recover the account instead of being a dead link.
- The backend CORS settings are irrelevant: the browser never calls the backend directly (see step 4).

Automated regression check: every end-to-end test runs against this backend, started from scratch by `frontend/e2e/start-backend.sh` (migrations + seed on a throw-away database).

---

## Step 2 — Create the frontend with React and Next.js

**Goal:** an initialized frontend project, with linting, formatting and the design variables.

What was done:

- `create-next-app@16.4.6`: TypeScript, App Router, `src/`, Tailwind CSS 4, ESLint.
- `cacheComponents` disabled (every page depends on the session cookie).
- Prettier (+ Tailwind class sorting) and `eslint-config-prettier`.
- Design tokens in `src/app/globals.css` (`@theme`): colors, fonts (Inter + Manrope via `next/font`), radii, from `design/DESIGN.md` and `design/specs/`.
- 17 icons generated as React components from the Figma SVG exports (`currentColor`, `aria-hidden`).
- Test tooling: Vitest (unit + integration projects), Testing Library, MSW, axe-core, Playwright.

| Check                  | Result                                                     |
| ---------------------- | ---------------------------------------------------------- |
| `npm run lint`         | ✅ 0 error, 0 warning                                      |
| `npm run typecheck`    | ✅                                                         |
| `npm run format:check` | ✅                                                         |
| `npm run build`        | ✅ production build (also run by every `npm run test:e2e`) |

### Libraries and why they are there

| Package                                                                                             | Why                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next`, `react`, `react-dom`                                                                        | Required stack (functional spec §2).                                                                                                                 |
| `zod`                                                                                               | Validation of every form and of the LLM output, shared by Server Actions; same rules as the backend so errors are shown next to the field.           |
| `sonner`                                                                                            | Accessible toast notifications (`aria-live`) for confirmations and errors — the mission suggests a toast library.                                    |
| `server-only`                                                                                       | Build-time guarantee that the API client, the session code and the AI code (which hold the token and the API key) are never bundled for the browser. |
| `llamaindex`, `@llamaindex/mistral`                                                                 | RAG framework and Mistral connector required by the functional spec.                                                                                 |
| `tailwindcss`, `@tailwindcss/turbopack`                                                             | Styling with the mockup tokens; utility classes keep the components self-contained.                                                                  |
| `vitest`, `@vitest/coverage-v8`, `jsdom`, `@vitejs/plugin-react`                                    | Fast unit/integration test runner with coverage.                                                                                                     |
| `@testing-library/*`                                                                                | Component tests from the user's point of view (roles, labels).                                                                                       |
| `msw`                                                                                               | Simulates the backend in the integration tests (network level, no code change).                                                                      |
| `@playwright/test`, `@axe-core/playwright`, `axe-core`                                              | End-to-end tests in a real browser and automated WCAG audits.                                                                                        |
| `prettier`, `prettier-plugin-tailwindcss`, `eslint-config-prettier`, `eslint`, `eslint-config-next` | Code quality and consistent formatting.                                                                                                              |

No component library, state manager or data-fetching library: the native `<dialog>` element, React
Server Components, Server Actions and `useActionState` cover the needs, with fewer dependencies to justify.

---

## Step 3 — Architecture and routing

**Goal:** basic navigation, main layout, folder structure.

Routing uses the **App Router**, the router recommended by Next.js.

```
frontend/src/
├── app/
│   ├── (auth)/login, (auth)/register        public pages (no menu)
│   ├── (app)/layout.tsx                     menu + footer, requires a session
│   ├── (app)/dashboard                      ?view=list|kanban|projects
│   ├── (app)/projects, (app)/projects/[projectId]   ?view=list|calendar
│   ├── (app)/account
│   ├── api/auth/session-expired/route.ts    clears an invalid session cookie
│   ├── not-found.tsx                        404 page
│   └── page.tsx                             "/" → dashboard or login
├── actions/        Server Actions (auth, account, projects, tasks, ai)
├── components/     ui/ (design system), layout/, auth/, dashboard/, projects/, tasks/, ai/, icons/
├── lib/            api/ (backend client), auth/ (session, DAL, token), ai/ (RAG pipeline), pure helpers
└── proxy.ts        route protection (Next.js 16 name of the middleware)
```

| Check                                                                                                  | Result                                                                                     |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Menu: "Tableau de bord" / "Projets" with the active tab (`aria-current="page"`), avatar → "Mon compte" | ✅ e2e `accessibility.spec.ts` (keyboard + `aria-current`)                                 |
| Every view has its own URL (dashboard views, project views, kanban month)                              | ✅ e2e `projects-tasks.spec.ts` (`view=kanban`), `accessibility.spec.ts` (`view=calendar`) |
| Unknown URL → 404 page with HTTP status 404                                                            | ✅ e2e `accessibility.spec.ts`                                                             |
| `/` redirects to the dashboard or the login page                                                       | ✅ unit `proxy.test.ts`                                                                    |

---

## Step 4 — Authentication

**Goal:** working, secure login and registration.

Design:

1. The login/register forms post to **Server Actions**; the backend JWT never reaches the browser's JavaScript.
2. The token is stored in an **httpOnly, SameSite=Lax cookie** (`Secure` in production), whose lifetime equals the token expiry. No `localStorage`.
3. `proxy.ts` makes an **optimistic** check (a non-expired cookie exists) and redirects to `/login?from=…`.
4. The **Data Access Layer** (`lib/auth/dal.ts`, `server-only`) sends the token to the backend, which verifies its signature on every call. A rejected token (401) goes through `/api/auth/session-expired`, which deletes the cookie.
5. Post-login redirect only accepts in-app paths (no open redirect).
6. Server errors are logged on the server and replaced by a generic message in the UI.

| Check                                                                                                          | Result                                                       |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Anonymous visitor of a protected page → login page with `from`                                                 | ✅ unit `proxy.test.ts`, e2e `auth.spec.ts`                  |
| Expired / malformed token treated as no session                                                                | ✅ unit `token.test.ts`, `proxy.test.ts`                     |
| Login sets an `httpOnly`, `SameSite=Lax` cookie; `document.cookie` and `localStorage` do not contain the token | ✅ integration `auth-actions.test.ts`, e2e `auth.spec.ts`    |
| Wrong credentials → backend message "Email ou mot de passe incorrect", no session                              | ✅ integration + e2e                                         |
| External `from` (`https://evil.example`, `//evil.example`) ignored                                             | ✅ unit `token.test.ts`, integration `auth-actions.test.ts`  |
| Registration with a weak password → rule shown next to the field; valid → logged in on the dashboard           | ✅ e2e `auth.spec.ts`                                        |
| Already used email → backend message                                                                           | ✅ integration                                               |
| Change name + password (current password required) → logout → old password refused → new password accepted     | ✅ e2e `auth.spec.ts`, integration `account-actions.test.ts` |
| Backend rejects the token (401) → session reset route                                                          | ✅ integration `account-actions.test.ts`                     |
| Logout deletes the cookie                                                                                      | ✅ integration + e2e                                         |
| Seed accounts usable (`alice@example.com` … with `P@ssword123`)                                                | ✅ e2e setup logs in as Alice and Bob                        |

⚠️ Deviations from the mockup: the registration page keeps only Email + Password (as drawn); the
"Mon compte" page splits the mockup's single password field into "Mot de passe actuel" and
"Nouveau mot de passe", because the backend requires the current password to change it.

---

## Step 5 — Integrate the mockups

**Goal:** the whole interface, compared to the Figma mockup (`design/screens/*.png`, `design/specs/*.md`).

### Features

| Feature (functional spec)                                                                             | Check                                                                                                  | Result |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------ |
| Create a project (name, description, contributors by autocomplete); the creator becomes administrator | e2e `projects-tasks.spec.ts`, integration                                                              | ✅     |
| Edit a project and add/remove contributors (administrators only)                                      | e2e (admin edits, contributor sees no "Modifier"), integration (diff add/remove, backend 403 surfaced) | ✅     |
| Delete a project (owner)                                                                              | integration                                                                                            | ✅     |
| Projects overview with progression, team, owner                                                       | screenshot review + e2e a11y                                                                           | ✅     |
| Non-member cannot open a project (404)                                                                | e2e (Caroline on Alice's project)                                                                      | ✅     |
| Create a task (title, description, due date, assignees, status)                                       | e2e + integration (status applied after creation)                                                      | ✅     |
| Edit a task, change its status                                                                        | e2e                                                                                                    | ✅     |
| Delete a task (with confirmation)                                                                     | e2e                                                                                                    | ✅     |
| Comments on tasks                                                                                     | e2e (add, counter updated), integration (empty comment refused)                                        | ✅     |
| Dashboard — list of assigned tasks, most urgent first, search                                         | e2e + unit `tasks.test.ts`                                                                             | ✅     |
| Dashboard — kanban of the tasks of the month by status                                                | e2e (task due this month in the right column) + unit                                                   | ✅     |
| Dashboard — projects with assigned tasks, most urgent first                                           | e2e + unit                                                                                             | ✅     |
| Project page — list of all tasks, status filter, search, calendar view                                | e2e + unit (`filterTasks`, `groupTasksByDueDate`)                                                      | ✅     |
| Loading, empty and error states                                                                       | component tests + manual review                                                                        | ✅     |

### Fidelity to the mockup

Every screen was captured at 1440 px with Playwright and compared with the mockup export
(`design/screens/`): menu, auth panel (562 px + photo), page grid (content from x=100 to x=1315,
project page back button at x=44), cards, tags, chips, modals (598 px, padding 79/73), typography
(Manrope 24/18 for titles, Inter 18/16/14/12/10) and colors are aligned with the specs.

⚠️ Deliberate deviations, all for accessibility or missing mockup states:

- Text colors darkened to reach the **4.5:1 AA contrast ratio**: brand orange text `#d3590b` → `#b04a08`
  (`#d3590b` kept for icons/logo/borders), status tags `#ef4444` → `#c81e1e`, `#e08d00` → `#9a5800`,
  `#27ae60` → `#1e7b45`, grey tags `#6b7280` → `#4b5563` on grey backgrounds.
- The "IA" and active-avatar backgrounds use `#b04a08` (white text on `#d3590b` is only 4.0:1).
- Comment chevrons follow the usual convention (down = collapsed); the mockup has them inverted.
- Elements not drawn in the mockup were designed with the existing components: third dashboard view
  ("Projets"), kanban month selector, calendar view (tasks grouped by due date), "…" task menu,
  comment form, logout button, delete-project button, 404 page, empty/loading/error states, focus ring.
- Footer year is the current year.

### Accessibility (WCAG 2.1 AA)

| Check                                                                                                                                                                                                                                             | Result                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| axe-core audit (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, **including color contrast**) on login, register, dashboard ×3 views, projects, project (list + calendar), account, 404, task modal, project modal, AI modal (empty and with results) | ✅ 0 violation (e2e `accessibility.spec.ts`, `ai.spec.ts`)                                                                                                                                                                                                           |
| axe-core on components (fields, modal, combobox, AI modal)                                                                                                                                                                                        | ✅ unit tests                                                                                                                                                                                                                                                        |
| Keyboard: skip link first, menu reachable, login form fully usable with Tab/Enter, combobox with arrows/Enter/Escape, Escape closes modals                                                                                                        | ✅ e2e + component tests                                                                                                                                                                                                                                             |
| Every image has a text alternative (decorative SVG `aria-hidden`, logo `role="img"` + label, auth photo `alt=""` because decorative)                                                                                                              | ✅ e2e check                                                                                                                                                                                                                                                         |
| ARIA: `aria-current`, `aria-expanded`/`aria-controls` (comments, task menu, combobox), `aria-invalid` + `aria-describedby` on fields, `aria-live` on search results and AI status, labelled dialogs and regions                                   | ✅ component + e2e tests                                                                                                                                                                                                                                             |
| WAVE browser extension, every page (run by Thibault on 2026-11-23)                                                                                                                                                                                | ✅ 0 error, 0 contrast error. Remaining alerts (not WCAG failures): _Very small text_ on the 10 px texts of the mockup (progression, team, avatar initials, comment dates) and _Redundant link_ (header logo and « Tableau de bord » tab both lead to the dashboard) |

### Responsive

| Check                                                                                                                                                     | Result                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Mobile viewport (Pixel 7): no horizontal scroll on every page, navigation usable (icon tabs with hidden labels), auth photo hidden, modals fit the screen | ✅ e2e `responsive.spec.ts`                      |
| Tablet (768 px): no horizontal scroll on the kanban and projects pages, 2-column project grid, stacked kanban columns                                     | ✅ Playwright screenshots reviewed on 2026-11-23 |

### No error in the console

| Check                                                                                               | Result   |
| --------------------------------------------------------------------------------------------------- | -------- |
| Every end-to-end test fails if the browser logs a console error or throws (fixture `consoleErrors`) | ✅ 27/27 |

---

## Step 6 — AI task generation

**Goal:** the user describes tasks in free text; a RAG pipeline loads similar existing tasks,
generates a relevant list that the user can edit before adding it to the project.

Pipeline (`frontend/src/lib/ai/`, called by the `generateTasks` Server Action):

1. **Access control**: the project and its tasks are loaded with the user's token → a non-member gets the backend 403.
2. **Retrieval (LlamaIndex.TS)**: each existing task becomes a `Document`, embedded with `mistral-embed` into an in-memory `VectorStoreIndex`; the 6 tasks closest to the request are retrieved. Embeddings are cached in memory to avoid re-embedding unchanged tasks.
3. **Augmentation**: system prompt (JSON-only answer, French, no duplicates of existing tasks, anti prompt-injection rule) + project + retrieved tasks + request.
4. **Generation**: `mistral-small-latest` (temperature 0.3) through `@llamaindex/mistral`.
5. **Validation**: JSON extracted and validated with zod (titles, descriptions, priority, max 8, duplicates removed); one retry on invalid output.
6. **Review**: the modal shows the list; the user deletes, edits, adds tasks or sends another prompt (results are appended).
7. **Saving**: `saveGeneratedTasks` creates the tasks in the current project, in order.

Security: the Mistral key is only read on the server (`MISTRAL_API_KEY`, no `NEXT_PUBLIC_` prefix, `server-only` modules, `.env.local` ignored by Git); rate limit of 10 generations per minute and per user; errors mapped to clear messages (missing/invalid key, quota 429, outage) without technical details.

| Check                                                                                                                                               | Result                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Retrieval returns the closest tasks (real LlamaIndex index with a deterministic embedding)                                                          | ✅ integration `ai.test.ts`                                                              |
| The retrieved tasks are in the prompt sent to the model (RAG)                                                                                       | ✅ integration                                                                           |
| Output parsing: fences, prose, invalid items, duplicates, cap, retry, final failure                                                                 | ✅ unit `parse.test.ts` + integration                                                    |
| Errors: quota (429), invalid key (401), outage, missing key, non-member (403), invalid prompt, rate limit                                           | ✅ unit + integration                                                                    |
| Saving: tasks created in the current project, in order; empty list or untitled task refused                                                         | ✅ integration                                                                           |
| Modal: generate, delete, edit, save; error shown in an alert; accessible                                                                            | ✅ component test `AiTaskModal.test.tsx`                                                 |
| Full flow in the browser (real backend, fake deterministic model): generate 3 → delete 1 → edit 1 → add → tasks visible in the project              | ✅ e2e `ai.spec.ts`                                                                      |
| Loading state while the model answers (spinner + `aria-live` message, prompt disabled)                                                              | ✅ component test                                                                        |
| **Relevance with the real Mistral model** (`npm run test:ai`: 3 scenarios — format, French, no duplicate of the RAG context, expected keywords)     | ✅ 3/3 on 2026-11-23 (sample output below)                                               |
| **Manual test with the real model** in the app (E-commerce project, prompt « Mettre en place un programme de fidélité avec points et codes promo ») | ✅ loading state shown, 5 relevant tasks in ~8 s, 5 tasks saved, toast, no console error |

### Results with the real model (2026-11-23)

Sample of `npm run test:ai` (`mistral-small-latest`, `mistral-embed`):

| Scenario                                                                         | RAG context retrieved                                                             | Generated tasks (titles)                                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| E-commerce — « Gérer les remboursements et les factures après un paiement »      | Intégrer le paiement Stripe · Concevoir la base de données · Créer la page panier | Configurer l'API de remboursement Stripe · Automatiser la génération des factures · Ajouter une section « Historique des remboursements » dans le compte utilisateur · Mettre en place un système de notifications pour les remboursements |
| Training platform — « Ajouter des badges et un tableau de suivi de progression » | Créer le système de quiz · Développer le lecteur vidéo                            | Définir les critères d'obtention des badges · Créer les badges visuels · Intégrer les badges au système de progression · Développer le tableau de suivi de progression · Tester l'affichage des badges et du tableau                       |
| Empty project — « Créer le site de A à Z »                                       | (none)                                                                            | 8 tasks from needs analysis to deployment, in a logical order                                                                                                                                                                              |

The tasks are in French, actionable, ordered, consistent with the existing tasks (Stripe is reused
for refunds, badges are linked to the existing quizzes and videos) and never duplicate them.

Issues found while testing with the real model, and fixed:

- **Duplicated LlamaIndex internals**: `@llamaindex/mistral@0.1.23` required `@llamaindex/core` 0.6.23 while
  `llamaindex@0.12.1` ships 0.6.22, so two copies were loaded ("llamaindex was already imported. This breaks
  constructor checks"). Both packages are now pinned to aligned versions (`llamaindex` 0.12.1,
  `@llamaindex/mistral` 0.1.22); `npm ls @llamaindex/core` shows a single version.
- **Lowercase titles** sometimes returned by the model → titles are capitalized by the parser (unit test).
- **Order of the saved tasks**: tasks without due date were shown in reverse creation order, because
  `Infinity - Infinity` is `NaN` in the sort → safe numeric comparison and creation date as last tie-break (unit tests).
- `npm run test:ai` skipped the suite: Vitest sets `NODE_ENV=test`, and the Next.js env loader then ignores
  `.env.local` on purpose → the evaluation setup loads `.env.local` itself.

---

## Self-assessment grid

| Indicator                                                                                                                        | Where it is checked                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ARIA, keyboard navigation, text alternatives, no WAVE error                                                                      | Step 5 › Accessibility                                                                                          |
| Pages and navigation compliant with the mockups (login/register, profile and its views, project creation/edition, 404)           | Step 5 › Fidelity, Step 3                                                                                       |
| Responsive                                                                                                                       | Step 5 › Responsive                                                                                             |
| No error on the site nor in the console                                                                                          | Step 5 › Console                                                                                                |
| Secure authentication                                                                                                            | Step 4                                                                                                          |
| Clean, organized, well-named, commented code                                                                                     | Lint + Prettier + typecheck; comments explain the non-obvious choices (backend quirks, security, accessibility) |
| AI feature works; secure LLM connection; existing tasks in the RAG context; relevant tasks                                       | Step 6                                                                                                          |
| Project creation/edition; task creation/edition                                                                                  | Step 5 › Features                                                                                               |
| Sign up, log in, change password                                                                                                 | Step 4                                                                                                          |
| Anyone can create a project and becomes its administrator; only members see it and manage its tasks; only administrators edit it | Step 5 › Features (e2e as Alice, Bob, Caroline)                                                                 |
