# USER_INTERVIEWS.md

Notes from three real conversations conducted during the week of May 8-13, 2026.
Each conversation was approximately 10-15 minutes via WhatsApp call or in person.

---

## Interview 1 — Aditi, CS Student, College Project Stage

**Date:** 2026-05-12
**Duration:** ~10 minutes
**Background:** Second year CS student who uses AI tools regularly for college assignments and note-making.

**Key quotes:**
- "I know ChatGPT Plus exists but honestly free is more than enough for what I do — notes, summaries, that kind of stuff."
- "I'm not going to pay $20 a month just for better notes. My use case doesn't justify it."
- "A tool like this doesn't really apply to me since I'm not spending anything — but I can see why a startup would need it."

**Most surprising thing she said:**
She was aware of the paid plans but had consciously decided against them — which I didn't expect. I assumed most students didn't know paid plans existed. She had evaluated the upgrade and made a deliberate decision to stay free. That's actually a more sophisticated user than I assumed.

**What it changed about my design:**
This made me reconsider the "optimal spend" result screen. Initially it felt like a weak outcome — "you're spending well" seemed like a failure state. But Aditi showed me that confirming someone is making the right decision is genuinely valuable. I made the optimal result screen more positive and confident rather than apologetic. "You're spending well" is a real result, not a consolation prize.

---

## Interview 2 — Mitali, CS Student / Freelance Developer, Early Projects Stage

**Date:** 2026-05-12
**Duration:** ~12 minutes
**Background:** CS student doing freelance development work, paying for both Claude Pro and ChatGPT Plus to help with coding.

**Key quotes:**
- "I pay around $44 a month I think — $20 for Claude and $24 for ChatGPT. Maybe more, I haven't checked recently."
- "Both help me write cleaner code. Claude is better for understanding large files, ChatGPT is better when I need quick answers."
- "I didn't think of it as overlap — they feel different when I use them. But yeah, $44 is a lot for a student."

**Most surprising thing she said:**
She didn't see Claude and ChatGPT as redundant at all — she had a clear mental model of when to use each one. This challenged my redundancy check logic which flags both as overlapping. Her use case is actually legitimate: different tools for different coding tasks. I expected her to react with "oh I'm wasting money" but instead she defended using both.

**What it changed about my design:**
I softened the Claude + ChatGPT redundancy recommendation. Instead of "you're paying for overlapping tools," the engine now says "review whether both tools serve distinct needs" — and only flags it as a real savings opportunity if the use case is writing or mixed, not coding. For coding users with both tools, the recommendation is more exploratory than prescriptive.

She was genuinely interested in trying SpendLens once — "I want to see what it actually says about my setup."

---

## Interview 3 — D.S. (Professor), Academic / Educator, Individual User

**Date:** 2026-05-13
**Duration:** ~10 minutes
**Background:** College professor using ChatGPT Go plan ($5/month) for writing research papers, drafting messages, and preparing teaching material.

**Key quotes:**
- "The Go plan is enough for what I need — I write papers, make notes, prepare lectures. I don't need the heavy version."
- "I've heard about other tools but I don't want to go through the process of learning something new and paying more on top of that."
- "If something showed me I was wasting money I would look at it. But right now I feel like I'm spending the right amount."

**Most surprising thing he said:**
He mentioned he would consider switching tools only if the savings were significant enough to justify the learning curve — "the cost of switching is not just money, it's time." This is a switching cost I hadn't accounted for in the audit engine at all. Price difference alone doesn't capture the full picture for non-technical users.

**What it changed about my design:**
Added a note to the audit results for non-coding use cases that acknowledges switching has a learning curve. The recommendation copy now includes "if you're comfortable with your current workflow" as a qualifier rather than assuming any cheaper alternative is automatically better. For users already on low-cost plans, the engine correctly returns "You're spending well" — which this conversation validated as the right call.

---

## Cross-Interview Patterns

All three users had different levels of AI spend but shared one thing: none of them had a clear benchmark for whether their spend was appropriate. Aditi knew free was right for her, Mitali wasn't sure $44 was justified, and the professor felt $5 was fine but couldn't compare it to anything. The common thread is that people make AI spend decisions in isolation — there's no reference point. That's exactly the gap SpendLens fills.