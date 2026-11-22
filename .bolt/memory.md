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
- Validation rules: reject empty description; reject amount ≤ 0; reject amount > 1,000,000.
- npm scripts: `test`, `typecheck`, `lint`, `build` — all green (11 tests passing).
- No extra packages installed beyond template defaults + Vitest.

## Open questions & assumptions

- Assumes all amounts are in a single, unspecified currency (no currency formatting/symbol defined).
- No persistence across reloads assumed by design.
- Category list assumed fixed; no add/edit category feature requested.
- No sorting/filtering of the expense list requested yet.