# PROMPTS.md

## AI Usage in SpendLens

SpendLens uses AI in exactly one place: generating a personalized audit summary paragraph on the results page. The audit engine itself uses hardcoded rules — knowing when not to use AI is a deliberate design decision.

---

## The Prompt (Not Yet Active — Fallback in Use)

The following prompt is written and ready. It activates when an Anthropic API key is provided.

```
You are a financial advisor specializing in AI tool procurement for startups.

A user has just completed an AI spend audit. Based on the audit data below, write a single paragraph (90-110 words) that:
1. States their total monthly AI spend and number of tools
2. Identifies their single biggest savings opportunity with a specific dollar amount
3. Notes whether their tool choices fit their stated use case
4. Ends with one concrete next step they should take this week

Tone: direct, professional, numbers-first. No fluff. Write as if you are presenting to a CFO.

Audit data:
- Use case: {{useCase}}
- Team size: {{teamSize}}
- Total monthly spend: ${{totalMonthlySpend}}
- Total potential savings: ${{totalMonthlySavings}}
- Tools audited: {{toolList}}
- Top recommendation: {{topRecommendation}}

Write only the paragraph. No preamble, no sign-off.
```

---

## Why I Wrote It This Way

**Numbers-first instruction:** Early drafts produced fluffy summaries like "You're doing great but could save some money!" The CFO framing forces specific dollar amounts in every summary.

**Word count constraint:** Without a limit, the model wrote 300-word essays. 90-110 words fits the results page without dominating it.

**"One concrete next step" ending:** This was added after testing showed summaries that listed multiple actions felt overwhelming. One action = one clear thing to do.

---

## What I Tried That Didn't Work

**Version 1 — Too vague:**
```
Summarize this AI spend audit and give recommendations.
```
Result: Generic advice that ignored the actual numbers. Useless.

**Version 2 — Too prescriptive:**
```
List exactly 3 bullet points with savings amounts.
```
Result: Forced bullet format broke the paragraph flow on the results page.

**Version 3 — Missing tone instruction:**
Without "direct, professional, numbers-first" the model defaulted to a friendly marketing tone that felt inconsistent with the audit data.

---

## Fallback Summary (Active)

Since the API key is not yet configured, SpendLens uses a deterministic templated summary:

```typescript
function generateFallbackSummary(result: AuditResult, formData: FormData): string {
  if (savingsCategory === 'optimal') {
    return `Your team is running a well-optimized AI stack across ${toolCount} tools...`
  }
  return `Your team spends $${totalSpend}/month across ${toolCount} AI tools. 
  This audit identified $${totalMonthlySavings}/month in potential savings...`
}
```

The fallback covers all three savings categories (high, low, optimal) and includes the same key data points the AI prompt would use. A user reading the fallback gets actionable information even without the AI call.

---

## API Failure Handling

The production implementation wraps the API call in try/catch:

```typescript
async function generateSummary(auditResult, formData) {
  try {
    // Call Anthropic API
    const response = await anthropic.messages.create({...})
    return response.content[0].text
  } catch (error) {
    // Any failure — rate limit, network, invalid key — falls back gracefully
    return generateFallbackSummary(auditResult, formData)
  }
}
```

This means the results page never breaks due to AI unavailability.