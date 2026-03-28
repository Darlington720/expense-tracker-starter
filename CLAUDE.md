# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run preview` — Preview production build

## Architecture

Single-page React 19 app (Vite, JSX, no TypeScript). All app logic lives in `src/App.jsx` — a single component managing finance transactions with local state (no backend, no router, no state library).

**Known bugs:** Transaction amounts are stored as strings, so `totalIncome`/`totalExpenses` computations use string concatenation instead of numeric addition. New transactions also store `amount` as a string from the input.
