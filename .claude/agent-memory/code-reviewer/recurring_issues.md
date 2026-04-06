---
name: Recurring issues flagged
description: Known code smells, bugs, and patterns flagged across reviews of this codebase
type: project
---

**Duplicated categories array** — Defined independently in TransactionForm.jsx and TransactionList.jsx. Should move to a shared `src/constants.js` file. Flagged in first full review (2026-04-04).

**Amount stored as string** — Transactions store `amount` as a string (from form input and seed data). Converted with `Number()` at every usage site. Should store as a number at creation time in TransactionForm's handleSubmit.

**Seed data bug: Freelance Work typed as expense** — App.jsx line 13: "Freelance Work" has `type: "expense"` but `category: "salary"`, clearly meant to be income. Flagged 2026-04-04.

**No empty-state UI in TransactionList** — When filters produce zero results (or all transactions are deleted), the table renders with headers but no rows and no message. Poor UX.

**window.confirm for delete** — TransactionList uses window.confirm() for delete confirmation. Blocks the thread, not styleable, inaccessible on some platforms. Should use inline confirmation UI.

**Unformatted currency display** — Summary and TransactionList display raw numeric amounts (e.g., `$5000`) without locale formatting. Should use `toLocaleString('en-US', { style: 'currency', currency: 'USD' })` or similar.

**No input validation beyond empty check** — TransactionForm only checks `!description || !amount`. Negative amounts, zero, and non-numeric inputs (the number input can be cleared to empty string) are not caught.

**Missing ARIA / accessibility** — Form inputs have no `<label>` elements (only placeholders). Table has no `<caption>` or `aria-label`. Delete button text is generic. Focus management after delete is not handled.

**handleAddTransaction uses stale closure** — App.jsx uses spread `[...transactions, transaction]` instead of the functional updater form `setTransactions(prev => [...prev, transaction])`. Safe currently because there are no concurrent updates, but a latent risk.

**outline: none on form controls** — App.css removes the default outline on inputs and selects without a visible replacement for focus. The gold border-color replacement only applies inside the form; the filters selects in TransactionList also have outline:none but use a separate rule. Both are missing a fallback for forced-colors/Windows High Contrast mode.

**CSS class name collision risk** — `.income-amount` and `.expense-amount` are used in both Summary (on `<p>`) and TransactionList (on `<td>`). The td-specific overrides in App.css (`td.income-amount`) work correctly now, but the shared class names make the cascade fragile.

**SpendingChart returns null when no expenses** — Renders nothing (not even a placeholder) when there are no expense transactions. The dashboard grid col layout breaks visually because the second column disappears. Should render a placeholder card.

**No `date` field in TransactionForm** — Transactions always get today's date. Users cannot back-date entries. Minor UX gap but worth noting.
