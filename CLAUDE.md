# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run preview` — Preview production build

## Architecture

Single-page React 19 app (Vite, JSX, no TypeScript). No backend, router, or state library.

- **`App.jsx`** — Owns the `transactions` array state and composes child components.
- **`Summary.jsx`** — Computes and displays total income, expenses, and balance from transactions.
- **`TransactionForm.jsx`** — Owns form state; calls `onAddTransaction` callback to add new entries.
- **`TransactionList.jsx`** — Owns filter state; renders a filtered table of transactions.

Categories are defined independently in `TransactionForm` and `TransactionList` (shared constant: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`).
