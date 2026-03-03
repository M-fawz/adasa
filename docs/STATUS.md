# STATUS — Adasa (عدسة)

## Current Phase
**Phase 0: Setup + Routing + Theme Tokens**

## Done ✅
- [x] Project scaffold (Vite + Router + Tailwind)
- [x] Base layout + header/footer
- [x] Theme tokens (colors/radius/shadows)
- [x] i18n setup + RTL/LTR switch
- [x] Blog list page UI (chips + search + view toggle)
- [x] Blog list logic (filter/search/paginate)
- [x] Blog details page `/blog/:slug`
## Done ✅
- [x] Project scaffold (Vite + Router + Tailwind)
- [x] Base layout + header/footer
- [x] Theme tokens (colors/radius/shadows)
- [x] i18n setup + RTL/LTR switch
- [x] Blog list page UI (chips + search + view toggle)
- [x] Blog list logic (filter/search/paginate)
- [x] Blog details page `/blog/:slug`
- [x] 404 page
- [x] Home page sections (latest posts + categories)
- [x] Fixed all `cn()` imports to use `@/shared/lib/utils` alias.
- [x] Refactored logic into custom hooks (`useDebounce`, `useQueryParams`, `useDirection`)
- [x] Final UI Polish (Animations, Responsive checks)
- [x] Featured Posts section implemented (pixel-perfect)

## Phase 1 — Global Theme + Background ✅
- [x] CSS design tokens (--bg, --panel, --text, --accent, etc.)
- [x] Body base styles (dark bg + light text)
- [x] `.app-bg` utility (grid overlay + radial edge glows)
- [x] Tailwind semantic color aliases (surface, panel, accent…)

## In Progress 🟡
- [ ] Data: Add Author info to `posts.json`
- [ ] Final UI Polish (Animations, Responsive checks)

## Next Up ⏭️
1. Manual Verification
2. Deployment preparation

## Notes
- Any PR must update this file: mark tasks done / move items.
- Keep PR scope small (1-3 tasks max).
