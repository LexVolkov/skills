---
name: safe-architecture-audit
description: >-
  Conservative read-only architecture audit for existing TypeScript
  full-stack/SPA apps (React/Next + API). Finds evidence-backed risks that get
  expensive when AI coding agents edit the code—client/server leaks, duplicate
  sources of truth, boundary smells—without pushing redesigns, deep-module
  jargon, or enterprise refactors. "Do nothing" and KEEP are valid outcomes.
  Outputs a dated HTML report plus a plan-oriented agent prompt. Use instead of
  rewrite/audit skills when you want a safe check of what already works, not a
  new architecture.
license: MIT
disable-model-invocation: true
---

# Safe Project Architecture Audit

Read-only audit of an **existing TypeScript** full-stack / SPA product (React/Next + API).

Goal: find concrete risks that get expensive as the project grows—especially with AI coding agents. **Not** a redesign. **KEEP** / “do nothing” are valid.

## Target stack

TypeScript · SPA (React/Vite) + Node/TS API · Next.js-style full-stack.

If the repo is not TS-oriented: say so briefly, use the general method only, skip forced TS findings.

## Most important rule

Do not treat “different from popular architecture” as a bug. Do not push “more enterprise / scalable / clean / modern”.

No concrete problem → no change recommendation.

---

# SAFETY RULES

**READ-ONLY.** Do not modify code, configs, deps, tests, or create `AGENTS.md`. No side-effect commands.

OK: read-only inspect (`grep`, `tsc --noEmit`, eslint without `--fix`, tests that don’t write/mutate external systems).

Never paste secret values into the report (note location only).

**Only write one file** (self-contained HTML — CSS/JS inlined inside it, **never** write separate `.css` / `.js` into the target project):

```text
reports/architecture-audit-YYYY-MM-DD.html
```

If that file exists today → `…-YYYY-MM-DD-HHMM.html`. Create `reports/` if needed.

Build from [references/report-template.html](references/report-template.html): **copy the contents of** [report-styles.css](references/report-styles.css) into `<style>` and [report-app.js](references/report-app.js) into `<script>` in that single HTML. Details: [report-format.md](references/report-format.md).

---

# METHOD

```text
Observe → Understand → Verify → Identify risks → Consider alternatives → Recommend only if justified
```

**Do not read the whole repo.** Sample entry points, high-import modules, and risk-prone areas. Prefer `rg`/`grep` with excludes over opening dependency trees.

**Always ignore** (do not open, list deeply, or dump into context):

* `node_modules/`, `bower_components/`, `.pnpm-store/`
* `.git/`, `.next/`, `dist/`, `build/`, `out/`, `coverage/`, `.turbo/`, `.cache/`
* lockfile giants when not needed (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`) — skip contents
* minified bundles, generated clients only if huge and not the subject of a finding
* binary/media assets

Map the real app (entries, UI, rules, data, externals, shared code, state, build/test)—enough to be accurate, not every file.

Then read and follow:

1. [references/stack-typescript-spa.md](references/stack-typescript-spa.md)
2. [references/risk-areas.md](references/risk-areas.md)
3. [references/ai-and-growth.md](references/ai-and-growth.md)
4. [references/evidence-rules.md](references/evidence-rules.md)
5. [references/report-format.md](references/report-format.md) + template

---

# AFTER THE REPORT

Chat only (user’s language, ≤ ~200 words)—see **CHAT RESPONSE** in report-format. Do not paste the HTML into chat.
