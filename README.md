# SpendLens — Free AI Spend Audit for Startups

SpendLens helps startup founders and engineering managers find out exactly where they're overspending on AI tools. Enter your current subscriptions, get an instant audit with specific savings recommendations, and share your report with your team.

**Live URL:** https://credex-audit-alpha.vercel.app

---

## Screenshots

> Add 3 screenshots here before submission:
> 1. The spend input form at /audit
> 2. A results page showing savings
> 3. The Credex CTA on a high-savings audit

---

## Quick Start

### Install

```bash
git clone https://github.com/riya-kaurav/credex-audit.git
cd credex-audit
npm install
```

### Environment Variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
ANTHROPIC_API_KEY=your_anthropic_key_optional
```

### Run Locally

```bash
npm run dev
```

Open http://localhost:3000

### Run Tests

```bash
npm test
```

### Deploy

```bash
vercel --prod
```

---

## Decisions

### 1. Audit engine runs client-side, not server-side

**Trade-off:** Running `runAudit()` in the browser means results are instant (no network round-trip) but the pricing logic is visible in the bundle.

**Why:** For an MVP, speed matters more than obfuscation. The pricing data is sourced from public vendor pages anyway. At scale this moves to an API route.

### 2. sessionStorage instead of URL params for passing audit results

**Trade-off:** sessionStorage means direct links to results pages don't work unless the audit was saved to Supabase first. URL params would work universally but expose all audit data in the URL.

**Why:** Privacy first. A user's spend data shouldn't appear in their browser history or server logs. The shareable URL only works after explicit email capture which triggers a Supabase save.

### 3. No AI in the audit engine

**Trade-off:** Hardcoded rules can't handle edge cases an LLM might catch. But LLMs hallucinate prices and make up plans that don't exist.

**Why:** Pricing logic is deterministic. $20 < $100 is always true. Using AI for math you can hardcode introduces hallucination risk with no upside. AI is used exactly once — for the summary paragraph.

### 4. Fallback summary instead of blocking on Anthropic API

**Trade-off:** The fallback is less personalized than a real AI-generated summary but the results page never breaks.

**Why:** A broken results page loses the lead permanently. A slightly less personalized summary loses nothing. Graceful degradation is the right call.

### 5. Email captured after value shown, never before

**Trade-off:** Some leads will take the recommendations and never give their email. We lose those leads.

**Why:** Gating before value destroys trust and conversion. Every tool that gates before showing results has lower completion rates. The audit result IS the value — show it first, capture after.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (Postgres)
- **Deployment:** Vercel
- **Testing:** Vitest
- **CI:** GitHub Actions