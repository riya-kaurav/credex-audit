# REFLECTION.md

---

## 1. The Hardest Bug You Hit This Week

The hardest bug was the Vitest alias resolution failure on Windows. The audit engine imports used Next.js path aliases (`@/lib/audit-engine`, `@/types`) which work perfectly in the browser but failed completely when Vitest tried to resolve them on Windows.

The error was `Cannot find package '@/lib/audit-engine'` — which was confusing because the same imports worked fine in the running Next.js app.

**Hypothesis 1:** Vitest config was missing the alias entirely. Added `resolve.alias` with `new URL('./src', import.meta.url).pathname` — still failed on Windows because `URL.pathname` on Windows returns `/C:/Users/...` with a leading slash that Windows path resolution doesn't understand.

**Hypothesis 2:** The leading slash was the issue. Added a `.replace(/^\/([A-Z]:)/, '$1')` to strip it — still failed intermittently.

**What worked:** Changed the test file imports to use relative paths (`../src/lib/audit-engine`) instead of aliases. Then realized the audit-engine.ts file itself also used `@/` aliases internally, which broke when Vitest tried to resolve the transitive imports. Fixed by changing all internal imports in `src/lib/` to relative paths too.

The lesson: path aliases are a build-tool feature, not a TypeScript feature. Each tool (Next.js, Vitest, Jest) needs to be configured separately to understand them, and on Windows the URL-based resolution has edge cases that Linux CI doesn't catch.

---

## 2. A Decision You Reversed Mid-Week

**Original decision:** Run the audit engine server-side via an API route. The reasoning was that keeping pricing logic on the server prevents users from inspecting or manipulating it.

**Why I reversed it:** While building the form, I realized that running the audit client-side makes the results instantaneous — no network round-trip, no loading spinner. For a tool where the value proposition is "instant audit," a 200-500ms API call felt wrong. The results page should feel like a calculator, not a form submission.

The pricing data is sourced from public vendor pages anyway, so there's nothing secret to protect. The obfuscation benefit was imaginary. The UX benefit of instant results was real.

**What I'd do differently:** I'd make this decision earlier by building a quick prototype of both approaches and comparing the feel. The right answer was obvious once I tried both, but I spent half a day building the API route before testing the client-side version.

---

## 3. What You Would Build in Week 2

**Priority 1 — Real Anthropic API integration**
The fallback summary works but a genuinely personalized 100-word paragraph that references the user's specific tools and use case would increase trust significantly. This is one API key away from working.

**Priority 2 — PDF export**
The assignment lists this as a bonus feature. A downloadable PDF of the audit report is something a founder would send to their co-founder or investor. High shareability, low engineering effort using a library like `@react-pdf/renderer`.

**Priority 3 — Benchmark mode**
"Your AI spend per developer is $X — companies your size average $Y" requires collecting aggregate data from early users. After 100+ audits the anonymized aggregate data becomes genuinely useful and makes every subsequent audit more valuable.

**Priority 4 — Pricing data automation**
Currently pricing is verified manually. A weekly script that fetches vendor pricing pages and flags changes would reduce maintenance overhead and improve accuracy.

---

## 4. How You Used AI Tools

**Tools used:** Claude (primary), ChatGPT (secondary for cross-checking)

**What I used AI for:**
- Generating component boilerplate (form layout, card components)
- Debugging the Vitest Windows path alias issue — described the error, got the hypothesis about URL pathname on Windows
- Writing first drafts of documentation files which I then edited for accuracy and specificity
- Reviewing TypeScript types for completeness

**What I didn't trust AI with:**
- The audit engine logic — I wrote every rule manually and verified it against the actual pricing pages. An LLM would confidently generate plausible-sounding but wrong pricing rules.
- The pricing data — verified every number directly on vendor websites
- The DEVLOG — wrote every entry myself since it describes what I actually did

**One specific time the AI was wrong:**
When I asked Claude to help with the Supabase setup, it suggested using `createServerComponentClient` from `@supabase/auth-helpers-nextjs` — a package that was deprecated in favor of `@supabase/ssr`. The generated code would have installed an outdated package. I caught it by checking the current Supabase documentation which showed the new `@supabase/ssr` package as the recommended approach.

---

## 5. Self-Rating

| Dimension | Rating | Reason |
|-----------|--------|--------|
| Discipline | 6/10 | Commits spread across 5 days but Day 2 was zero hours. Should have started outreach and interviews earlier. |
| Code quality | 7/10 | TypeScript types are solid, audit engine is clean and testable, but some components could be broken into smaller pieces. |
| Design sense | 7/10 | Chose minimal white + dark green deliberately. Results page is clean and screenshot-worthy. Could have added more visual hierarchy to the hero savings numbers. |
| Problem-solving | 8/10 | Debugged the Vitest Windows issue systematically, reversed the server-side audit decision quickly once I tested both. |
| Entrepreneurial thinking | 7/10 | GTM and economics are specific and number-driven. User interviews happened but could have started earlier to influence design more. |