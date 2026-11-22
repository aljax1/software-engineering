# AGENTS.md

Guidance for AI agents (and human reviewers) working in this repository.

## Purpose

A single-user, client-side Expense Calculator built with React + TypeScript + Vite + Tailwind.
Fictional/demo data only. No login, no database, no backend, no network calls.
State is in-memory (session only) and resets on reload.

## Architecture

- `src/lib/expenses.ts` — pure business logic: types, validation, add, delete, total, totalPerCategory. No React, no I/O, no side effects (except `crypto.randomUUID` for new IDs).
- `src/App.tsx` — UI only. Holds React state, calls the pure functions, renders the add-form, list, and totals. No business rules here.
- `tests/expenses.test.ts` — Vitest unit tests for the pure functions. 11 tests.
- `vitest.config.ts` — Vitest config (node environment, `tests/**/*.test.ts`, `@` alias).
- `vite.config.ts` — Vite build config with `@` path alias to `src/`.

## Setup

1. `npm install` — install dependencies.
2. `npm run dev` — start the dev server (not available in sandboxed environments; runs automatically in Bolt).

## Safe commands

Agents may run these without extra approval:

| Command | What it does |
| --- | --- |
| `npm test` | Runs the Vitest suite (`vitest run`). |
| `npm run typecheck` | `tsc --noEmit -p tsconfig.app.json`. |
| `npm run lint` | `eslint .` |
| `npm run build` | `vite build` — production build. |
| `npm audit` | Read-only vulnerability report. |
| `npm outdated` | Read-only outdated-dependency report. |

## Coding conventions

- TypeScript strict mode. No `any` without justification.
- Pure functions for all business logic; keep them in `src/lib/`.
- UI components stay in `src/` and never contain business rules.
- Use the `@/` path alias for `src/` imports (e.g. `@/lib/expenses`).
- Lucide React for icons. Do not install other icon/UI-theme packages.
- Tailwind for styling. No CSS frameworks beyond it.
- Comments: none by default. Add one only when the *why* is non-obvious.
- Match existing file style; do not introduce new patterns without reason.

## Test expectations

- Business-logic tests live in `tests/expenses.test.ts` and target the pure functions only.
- Minimum 8 tests (currently 11). Add tests when you add logic — not when you touch UI.
- Tests must pass: `npm test` must be green before any change is considered done.
- Do not test React rendering here; this suite is logic-only.

## Review gates

A human must approve **every diff** before it is merged or considered final. This applies to:

- Source changes (`src/`).
- Test changes (`tests/`).
- Dependency changes (`package.json`, `package-lock.json`).
- Config changes (`*.config.*`, `tsconfig.*`).
- Documentation changes.

Agents should present the diff and wait. Do not self-approve.

## Forbidden actions

- **No secrets or real personal data** in code, tests, commits, or docs. This is a demo app with fictional data only.
- **No production deployment.** This app is not production-grade; do not publish, ship, or deploy it.
- **No destructive commands.** No `rm -rf`, no `git reset --hard`, no dropping/force-overwriting files you did not create. If unsure, ask.
- **No dependency changes without explicit approval.** No `npm install <pkg>`, no version bumps, no `npm audit fix --force` without a human saying yes.
- **No changes to validation rules or existing tests without approval.** The rules (empty description, amount ≤ 0, amount > 1,000,000) and the current test assertions are locked unless a human approves.
- **No network calls or backend.** No fetch/XHR, no Supabase usage, no external APIs. Everything is client-side and in-memory.
