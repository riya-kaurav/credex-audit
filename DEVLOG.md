# DEVLOG.md

---

## Day 1 — 2026-05-08

**Hours worked:** 4

**What I did:**
Set up the Next.js 14 project with TypeScript and Tailwind. Configured Supabase, created the database schema (audits and leads tables). Defined all core TypeScript types in src/types/index.ts. Built the pricing data file with verified pricing for all 8 tools. Started reaching out to potential users for interviews.

**What I learned:**
The shadcn CLI had network issues so I installed Radix UI primitives directly. Also learned that crypto.randomUUID() works as a browser global — no need to import the Node crypto module.

**Blockers / what I'm stuck on:**
Supabase anon key vs publishable key naming inconsistency between the shadcn setup command and standard Supabase docs. Resolved by checking the generated client.ts file.

**Plan for tomorrow:**
Build the audit engine core logic and spend input form.

---

## Day 2 — 2026-05-09

**Hours worked:** 0

**Reason:** [ADD YOUR REASON — college, personal commitment, etc. Be honest. Honesty scores higher than fake entries.]

---

## Day 3 — 2026-05-10

**Hours worked:** 5

**What I did:**
Built the complete audit engine in src/lib/audit-engine.ts. Implemented all 4 checks: team size mismatch, cheaper plan detection, use case mismatch, and redundancy detection for overlapping tools (Cursor + Copilot, Claude + ChatGPT). Built the spend input form with localStorage persistence and ToolRow component.

**What I learned:**
The findCheapestValidPlan function was initially returning free-tier plans as valid cheaper alternatives — which isn't honest advice since free plans have usage limits that break team workflows. Added an isPaid filter to exclude pricePerSeat === 0 plans from recommendations.

**Blockers / what I'm stuck on:**
The redundancy check was pushing a duplicate recommendation for GitHub Copilot instead of replacing the existing one. Fixed by using findIndex and replacing the array element directly.

**Plan for tomorrow:**
Build the results page components and wire up the full form → results flow.

---

## Day 4 — 2026-05-11

**Hours worked:** 6

**What I did:**
Built all results page components: HeroSection, ToolCard, CredexCTA, LeadCapture. Wired up the full form submission → sessionStorage → results page flow. Fixed crypto.randomUUID browser compatibility issue. Set up Vitest, wrote 8 tests for the audit engine — all passing. Set up GitHub Actions CI workflow. Fixed multiple ESLint errors (unescaped apostrophes in JSX, setState in effect pattern). Deployed to Vercel.

**What I learned:**
ESLint's react/no-unescaped-entities rule requires apostrophes in JSX text to be written as &apos; — easy to miss when writing natural language copy. Also learned that calling setState directly inside useEffect body triggers the react-hooks/set-state-in-effect rule — wrapping in an inner function resolves it.

**Blockers / what I'm stuck on:**
Vitest alias resolution on Windows — the @/ path alias works in Next.js but not in Vitest on Windows due to how URL paths are resolved. Fixed by using relative imports in test files and src files.

**Plan for tomorrow:**
Write all documentation files. Complete user interviews. Add OG meta tags.

---

## Day 5 — 2026-05-12

**Hours worked:** [FILL IN]

**What I did:**
[FILL IN — write what you actually do tomorrow. Docs, interviews, OG tags, final polish.]

**What I learned:**
[FILL IN]

**Blockers / what I'm stuck on:**
[FILL IN]

**Plan for tomorrow:**
[FILL IN]

---

## Day 6 — 2026-05-13

**Hours worked:** [FILL IN]

**What I did:**
[FILL IN — final submission day. What you finished, what you submitted.]

**What I learned:**
[FILL IN]

**Blockers / what I'm stuck on:**
[FILL IN]

**Plan for tomorrow:**
Submitted. Waiting for Round 2 results.

---

## Day 7 — [DATE]

**Hours worked:** [FILL IN or 0]

**What I did / Reason if 0:**
[FILL IN]

**What I learned:**
[FILL IN]

**Blockers / what I'm stuck on:**
[FILL IN]

**Plan for tomorrow:**
[FILL IN]