# Report format

## File

`reports/architecture-audit-YYYY-MM-DD.html` (same day exists → `…-HHMM.html`). Never overwrite.

**One file only** in the target repo. Do **not** add `report-styles.css`, `report-app.js`, or any other asset next to the report.

Build a **standalone** HTML (works via `file://`):

1. Start from [report-template.html](report-template.html) structure
2. Paste the full text of [report-styles.css](report-styles.css) into `<style>`
3. Paste the full text of [report-app.js](report-app.js) into the bottom `<script>`
4. Fill chapters; clone the sample card

No `<link rel="stylesheet">`, no `<script src="…">`.

Visible UI in the **user’s language**. `agent-data` may stay English.

## UX (from report-app.js)

- Checkbox “add to agent prompt” (default on) + spoiler with that item’s text
- Bottom button → **plan** prompt from checked items (not “fix everything”)
- Modal explains what the prompt does

`data-kind`: `problem` | `watch` | `keep` | `context`

## Card pattern

```html
<article class="card" data-prompt-item data-kind="problem" data-id="now-1">
  <div class="card-head">
    <span class="prio now">🔴</span>
    <h3>Short title</h3>
  </div>
  <p>Plain language. Fix Now/Soon: what if ignored.</p>
  <div class="prompt-opt">
    <input type="checkbox" id="inc-now-1" checked />
    <label for="inc-now-1">Add to agent prompt</label>
  </div>
  <script type="application/json" class="agent-data">{
    "priority": "FIX NOW",
    "title": "…",
    "body": "FACT:\nWHERE:\nGOAL:\nDO NOT:\nDONE WHEN:\nCONFIDENCE: HIGH|MEDIUM|LOW"
  }</script>
</article>
```

Human **Plan** chapter stays out of the built prompt.

## Chapters

Map → Fix now → Fix soon (≤10) → Watch (≤10) → Keep → AI risks → Rules (don’t create AGENTS.md) → Safety → Plan for you (≤5 each column).

Empty → short NO ACTION. Prefer KEEP over invented problems. Hero: health + counts + five answers.

## Quality

Evidence or drop. FACT ≠ OPINION. Fix smaller than the problem.

## CHAT RESPONSE

User’s language, ≤ ~200 words:

```text
Audit completed.
Overall health: 🟢/🟡/🟠/🔴
Findings: 🔴 X · 🟠 X · 🟡 X · 🟢 X
Most important finding: …
Most important recommendation: …
Report: reports/architecture-audit-YYYY-MM-DD.html
```
