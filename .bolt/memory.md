# Project memory

## Product intent & audience

- Expense Calculator: single-user, client-side utility for adding/listing/deleting expenses and viewing totals.
- Fictional/demo data only — no login, database, or backend; state is in-memory (session only).

## Brand personality & voice

- Minimal, functional utility. Straightforward labels and feedback; no marketing tone.

## Visual design & UX direction

- Clean Tailwind styling; minimal interface focused on the add-form, list, and totals.
- Categories (Food/Transport/Study/Other) should be visually distinguishable (e.g., color or badge).
- Inline validation feedback expected for rejected inputs.
- Lucide React icons used where iconography is needed.

## Decisions, constraints & rationale

- Stack: React + TypeScript + Vite + Tailwind; Vitest for tests; ESLint configured.
- Separation of concerns: pure business logic in `src/lib/expenses.ts`; UI in `src/App.tsx`; tests in `tests/expenses.test.ts`.
- Pure functions chosen for testability and predictable state updates.
- Fixed category set: Food, Transport, Study, Other.
- Validation rules: reject empty description; reject amount ≤ 0; reject amount > 1,000,000; reject amounts with more than 2 decimal places (e.g. 0.001).
- Totals (`total()`, `totalPerCategory()`) computed in integer cents via `Math.round(amount*100)`, then divided by 100 to eliminate floating-point drift (e.g. 0.1+0.2 yields exactly 0.3).
- AGENTS.md workflow followed for approved minimal diffs; no dependency changes.
- npm scripts: `test`, `typecheck`, `lint`, `build` — all green (13 tests passing: 11 original unchanged + 2 new).

## Open questions & assumptions

- Assumes all amounts are in a single, unspecified currency (no currency formatting/symbol defined); cents-based arithmetic implies 2-decimal precision model.
- No persistence across reloads assumed by design.
- Category list assumed fixed; no add/edit category feature requested.
- No sorting/filtering of the expense list requested yet.