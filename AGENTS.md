# AGENTS.md

Guidance for AI coding agents (and humans) working on **SLAB**, a responsive to-do list web app.

## Stack
- React 19 + TypeScript (strict) + Vite. Tests with Vitest.
- No backend. Data persists in the browser via `localStorage` (`src/lib/useLocalStorage.ts`).
- Plain CSS in `src/styles.css` (no CSS framework).

## Commands
```bash
npm install
npm run dev        # local dev server
npm run typecheck  # tsc --noEmit — must pass
npm test           # vitest — must pass
npm run build      # typecheck + production build — must pass before every merge
```
Definition of done for any change: `typecheck`, `test` and `build` all pass with zero errors or warnings.

## Layout (organized by feature)
```
src/
  App.tsx, main.tsx, styles.css, types.ts
  lib/                     shared helpers (localStorage hook)
  features/
    tasks/                 core tasks + categories + priorities + due dates
    filters/               search, filter, sort
    panels/                Notes, Focus, Remember side panels
```
Each feature folder owns its components, logic and tests. Cross-feature imports go through `types.ts` or `lib/`.

## Design system — "Concrete + Dusty Rose"
Modernist, blunt, masculine. Do not soften it.
- Colors are CSS variables in `:root` (`--concrete`, `--ink`, `--rose`, `--rose-deep`, `--rose-wash`). Never hard-code hex values in components.
- Square corners (no `border-radius`), 3px black borders, hard offset shadows (no blur).
- Type: Space Grotesk (UI) + JetBrains Mono (labels, metadata, uppercase).
- Must work at 360px wide (phone) and 1440px wide (laptop). Touch targets >= 44px. Mobile is single column; laptop uses a main column + sticky side column (breakpoint 900px).
- Keep contrast AA: ink on concrete/paper/rose only. Focus rings must stay visible.

## Git workflow
- One feature per branch: `feature/<name>`, merged into `main` with `--no-ff`.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`.
- Never commit `node_modules` or `dist`.

## Conventions
- State lives in hooks (`useTasks`) with pure reducer/helper functions that are unit-tested.
- Never let `localStorage` failures crash the UI; use the shared hook.
- Prefer small components; no `any`; no unused variables (compiler enforces it).
- Accessibility: real `<button>`/`<label>` elements, `aria-*` where needed, keyboard operable.

## Adding a feature
1. Branch `feature/<name>`. 2. Add `src/features/<name>/` with logic + tests. 3. Wire in `App.tsx`. 4. Run the definition-of-done commands. 5. Merge `--no-ff`.
