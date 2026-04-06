---
name: Project architecture & conventions
description: Stack, component responsibilities, naming/style patterns, and shared constants in the expense tracker app
type: project
---

React 19 + Vite SPA, JSX only (no TypeScript, no router, no state library).

**State ownership:** `transactions` array lives in App.jsx. Children receive it as props. No context or global store.

**Component roles:**
- App.jsx — composes everything, owns transactions state, passes callbacks down
- Summary.jsx — pure display, computes totals inline (no memoization)
- TransactionForm.jsx — owns its own form state; calls onAddTransaction prop on submit
- TransactionList.jsx — owns its own filter state (filterType, filterCategory)
- SpendingChart.jsx — Recharts bar chart, expense-only, derives data inline

**Styling:** Dark "Midnight Ledger" theme. CSS variables in index.css (:root). Component styles in App.css (single shared file, not CSS modules). Fonts: Playfair Display (display) and DM Sans (body) from Google Fonts.

**Categories constant:** Defined independently as a module-level array in BOTH TransactionForm.jsx and TransactionList.jsx. This is a known duplication — should live in a shared constants file.

**ID generation:** Date.now() used in TransactionForm for new transaction IDs. Seed data uses sequential integers.

**Amount type:** Stored as a string in state and seed data; converted with Number() at usage sites (Summary, SpendingChart). Inconsistency: form passes raw input string, seed data also uses strings.

**Code style:** No semicolons in SpendingChart.jsx (uses Recharts); semicolons inconsistently used elsewhere. Single quotes throughout. No prop-types or TypeScript.
