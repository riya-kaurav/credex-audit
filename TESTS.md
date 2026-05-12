# TESTS.md

## How to Run Tests

```bash
npm test
```

All tests use Vitest. No additional setup required.

---

## Test File

`tests/audit-engine.test.ts`

---

## Test List

| # | Test Name | What It Covers | Function Tested |
|---|-----------|---------------|-----------------|
| 1 | Team plan with single user gets downgraded | Check 1: detects when a user is on a team plan (minSeats > 1) with fewer seats than required and recommends individual plan | `getRecommendationForTool` |
| 2 | Already on optimal plan returns zero savings | Ensures engine returns savingsAmount === 0 and "No changes needed" when user is on the cheapest valid paid plan for their use case | `getRecommendationForTool` |
| 3 | Expensive plan for use case gets downgraded | Check 2: detects when a cheaper plan from the same vendor supports the user's use case and team size | `getRecommendationForTool` |
| 4 | Cursor + Copilot redundancy is flagged | Check 3: detects when user has both Cursor and GitHub Copilot for a coding use case and flags the overlap | `runAudit` |
| 5 | Annual savings is exactly 12x monthly | Validates the savings calculation — totalAnnualSavings must equal totalMonthlySavings × 12 with no rounding errors | `runAudit` |
| 6 | savingsCategory is "high" when savings exceed $500 | Validates savings category threshold — input of 600 returns "high" | `getSavingsCategory` |
| 7 | savingsCategory is "optimal" for zero savings | Validates savings category threshold — input of 0 returns "optimal" | `getSavingsCategory` |
| 8 | Already on optimal plan returns zero savings (duplicate debug test) | Secondary validation of test 2 with console logging during development | `getRecommendationForTool` |

---

## Test Results

```
✓ tests/audit-engine.test.ts (8 tests) 23ms
  ✓ Audit Engine (8)
    ✓ Team plan with single user gets downgraded
    ✓ Already on optimal plan returns zero savings
    ✓ Expensive plan for use case gets downgraded
    ✓ Cursor + Copilot redundancy is flagged
    ✓ Annual savings is exactly 12x monthly
    ✓ savingsCategory is "high" when savings exceed $500
    ✓ savingsCategory is "optimal" for zero savings
    ✓ Already on optimal plan returns zero savings

Test Files  1 passed (1)
     Tests  8 passed (8)
```

---

## CI

Tests run automatically on every push to `main` via `.github/workflows/ci.yml`.
Current status: ✅ passing