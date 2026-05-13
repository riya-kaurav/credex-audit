# DEVLOG.md

---

## Day 1 — 2026-05-08

**Hours worked:** 4

**What I did:**
Set up the Next.js 14 project with TypeScript and Tailwind. Ran into shadcn CLI network issues — resolved by selecting Base preset after the Radix option failed to connect. Installed Radix UI primitives directly. Configured Supabase by running the shadcn Supabase command which created client.ts, middleware.ts, and server.ts. Created the database schema with audits and leads tables via Supabase SQL editor. Defined all core TypeScript types in src/types/index.ts — AITool union, ToolInput, FormData, AuditResult, Lead. Built the pricing data file with verified pricing for all 8 tools by checking each vendor pricing page directly. Started reaching out to college friends for user interviews.

**What I learned:**
The shadcn CLI uses NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY instead of the standard NEXT_PUBLIC_SUPABASE_ANON_KEY. Also learned that crypto.randomUUID() is available as a browser global — importing the Node crypto module breaks in client components.

**Blockers / what I'm stuck on:**
shadcn network timeout on first init attempt. Resolved by trying the Base preset.

**Plan for tomorrow:**
Build the audit engine core logic with all 4 checks and start the spend input form.

---

## Day 2 — 2026-05-09

**Hours worked:** 0

**Reason:** College practical examination. No work done on the project today.

---

## Day 3 — 2026-05-10

**Hours worked:** 5

**What I did:**
Built the complete audit engine in src/lib/audit-engine.ts with all 4 checks: team size mismatch, cheaper plan detection, wrong tool for use case, and redundancy detection. Added Cursor + Copilot redundancy check and Claude + ChatGPT overlap check. Built the spend input form with localStorage persistence. Built all results page components — HeroSection, ToolCard, CredexCTA, LeadCapture. Wired up the full form submission to results page flow via sessionStorage.

**What I learned:**
findCheapestValidPlan was returning free tier plans as valid cheaper alternatives — wrong because free plans have usage limits that break workflows. Added isPaid filter (pricePerSeat > 0). The redundancy check was pushing a duplicate recommendation instead of replacing — fixed with findIndex.

**Blockers / what I'm stuck on:**
Results page was 404 because audit page was in wrong location. Fixed by creating src/app/audit/page.tsx.

**Plan for tomorrow:**
Fix remaining bugs, set up tests, get CI working, deploy to Vercel.

---

## Day 4 — 2026-05-11

**Hours worked:** 6

**What I did:**
Fixed crypto.randomUUID browser error by removing Node crypto import. Set up Vitest — hit Windows path alias resolution issues, fixed by switching to relative imports in test files and src/lib. Wrote 8 tests for the audit engine, all passing. Set up GitHub Actions CI. Fixed multiple ESLint errors: unescaped apostrophes in JSX (replaced with &apos;), setState in useEffect (wrapped in inner function), unused variable in audit engine. Deployed to Vercel. Built the landing page.

**What I learned:**
ESLint react/no-unescaped-entities catches apostrophes in JSX text. Any word like "you&apos;re" or "we&apos;ll" needs entity encoding. The react-hooks/set-state-in-effect rule fires when setState is called directly in useEffect body — wrapping in an inner function resolves it cleanly.

**Blockers / what I'm stuck on:**
CI failing due to package-lock.json out of sync. Fixed by running npm install locally and committing updated lock file, then switching from npm ci to npm install in workflow.

**Plan for tomorrow:**
Write all documentation files. Conduct user interviews.

---

## Day 5 — 2026-05-12

**Hours worked:** 5

**What I did:**
Wrote and committed all documentation files: ARCHITECTURE.md with Mermaid diagram, METRICS.md, GTM.md, ECONOMICS.md, TESTS.md, PRICING_DATA.md. Conducted 2 of 3 user interviews with college friends. Took screenshots of deployed app.

**What I learned:**
Writing ECONOMICS.md forced clear thinking about what conversion rate makes this tool worth building. The math showed it is profitable from the first conversion at zero paid CAC.

**Blockers / what I'm stuck on:**
Third interview scheduled for tomorrow morning.

**Plan for tomorrow:**
Complete third interview. Finalize all docs. Submit.

---

## Day 6 — 2026-05-13

**Hours worked:** 4

**What I did:**
Completed third user interview. Wrote USER_INTERVIEWS.md. Finalized DEVLOG and REFLECTION. Added screenshots to README. Final end-to-end test of deployed app — form, results, lead capture, shareable URL all working. Confirmed CI green and 5 distinct commit days. Submitted Google Form.

**What I learned:**
Users were far less aware of their AI spend than I expected. One person had to check their bank app to give me a number. That validated the core premise more than any assumption made during building.

**Blockers / what I'm stuck on:**
None. Submission complete.

**Plan for tomorrow:**
Waiting for Round 2 results.

---

## Day 7 — 2026-05-14

**Hours worked:** 0

**Reason:** Submission was completed on Day 6. Rest day.