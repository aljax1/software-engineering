# Expense Calculator

A minimal, single-user, client-side expense tracker built with **React + TypeScript + Vite + Tailwind**.
Fictional/demo data only — no login, no database, no backend, no network calls. All state is in-memory and resets on page reload.

## Features

- Add an expense with a **description**, **amount**, and **category** (Food / Transport / Study / Other).
- List all expenses with color-coded category badges.
- Delete an expense.
- See the **grand total** and **total per category**.
- Input validation with inline error feedback:
  - Rejects empty description.
  - Rejects amount ≤ 0.
  - Rejects amount > 1,000,000.

## Run / check commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies. |
| `npm run dev` | Start the dev server (runs automatically in Bolt). |
| `npm test` | Run the Vitest unit tests. |
| `npm run typecheck` | Type-check with `tsc --noEmit`. |
| `npm run lint` | Lint with ESLint. |
| `npm run build` | Production build with Vite. |

All four checks (`test`, `typecheck`, `lint`, `build`) should pass before any change is considered complete.

## Acceptance criteria

- **AC1 — Invalid input rejected.** The app rejects an empty description, an amount ≤ 0, and an amount > 1,000,000. The user sees an inline error message and no expense is added.
- **AC2 — Totals equal the sum of stored amounts.** The grand total and each category total equal the sum of the corresponding stored expense amounts.
- **AC3 — Add/delete never mutate the list.** `addExpense` and `deleteExpense` return new arrays; the original array is never modified.
- **AC4 — test + typecheck + lint + build pass.** All four npm scripts exit green.
- **AC5 — No secrets / backend / network calls.** The app contains no secrets, no database access, no backend, and no network calls. Everything runs client-side with in-memory state.

## Project structure

```
.
├── src/
│   ├── lib/
│   │   └── expenses.ts      # Pure business logic (types, validation, add, delete, totals)
│   ├── App.tsx              # UI: form, list, totals
│   ├── main.tsx             # React entry point
│   └── index.css            # Tailwind directives
├── tests/
│   └── expenses.test.ts     # Vitest unit tests for pure functions
├── vite.config.ts           # Vite config (@ alias -> src)
├── vitest.config.ts         # Vitest config
├── tsconfig.app.json        # TS config (strict)
├── eslint.config.js         # ESLint config
├── tailwind.config.js       # Tailwind config
└── package.json             # Scripts and dependencies
```
