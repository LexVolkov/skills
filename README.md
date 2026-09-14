# LexVolkov / skills

Public collection of **Cursor Agent Skills**.

[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![skills.sh](https://img.shields.io/badge/skills.sh-LexVolkov%2Fskills-000?logo=vercel&logoColor=white)](https://skills.sh/LexVolkov/skills)

## Install

All skills from this repo:

```bash
npx skills add LexVolkov/skills
```

One skill:

```bash
npx skills add LexVolkov/skills --skill safe-architecture-audit
npx skills add LexVolkov/skills --skill grill-me-softly
```

Or prompt:

```md
Run `npx skills add LexVolkov/skills --skill grill-me-softly` and follow the generated skill instructions now.
```

| | |
| --- | --- |
| GitHub | https://github.com/LexVolkov/skills |
| skills.sh | https://skills.sh/LexVolkov/skills |

---

## Skills

### grill-me-softly

**Soft grilling: only decisions that are expensive to reverse.**

Interviews you on high-stakes product/architecture forks — data model, permissions, system boundaries, irreversible rules, public contracts. Skips look-uppable facts, existing conventions, and low-stakes polish. Plain language; 1–3 questions per round.

Explicitly invoke (does not auto-trigger):

```text
Use grill-me-softly
```

Inspired by [mattpocock/grill-me](https://github.com/mattpocock/skills) (MIT); self-contained — no separate grilling skill required.

---

### safe-architecture-audit

**Conservative architecture audit for TypeScript apps that AI agents keep editing.**

Read-only. Evidence-backed. No redesign theatre.

Audits an **existing** React/Next-style TypeScript product for risks that get expensive as the codebase grows—especially when coding agents touch it—then writes a clear HTML report and a **plan** prompt. It will not invent a new architecture for you.

Explicitly invoke (does not auto-trigger):

```text
Use safe-architecture-audit on this repo
```

#### Who it’s for

You ship a **TypeScript full-stack or SPA** product (UI + API + data). Agents help you move faster. You’re not looking for “make it enterprise”—you want to know:

1. What’s actually dangerous (with file paths)
2. What works and should **not** be “improved”
3. A calm next plan you can hand to an agent

**Good fit:** Next.js / React + Node API / similar TS stacks · live apps · Cursor daily.

**Not this skill:** security CVE hunts · “deep modules” redesign · enterprise makeovers · LLM agent-runtime audits.

#### Why this one

| Other audits often… | This skill… |
| --- | --- |
| Propose a new architecture | Assumes yours may already be fine |
| Treat long files as bugs | Length alone is not a finding |
| Optimize for “best practice” fashion | Requires concrete evidence of harm |
| Dump a wall of markdown | Ships a dated **HTML** report people actually open |
| Say “fix everything” | Builds a **remediation plan** prompt from what you check |

**KEEP** and **do nothing** are first-class outcomes.

#### What you get

```text
reports/architecture-audit-YYYY-MM-DD.html
```

One self-contained HTML file (styles + JS inlined — **no** separate `.css`/`.js` in the target project): health badge, plain-language chapters, per-finding “add to agent prompt” checkboxes, spoiler + copy, button to build a remediation **plan** prompt.

Report language follows the language of your chat request.

#### How it thinks

```text
Observe → Understand → Verify → Identify risks → Consider alternatives → Recommend only if justified
```

Focus: client ↔ server boundaries · typed contracts · duplicate sources of truth · barrel / sideways imports · where agents are most likely to make it worse.

#### Principles

1. **Read-only** — no refactors, no dependency installs
2. **Evidence or silence** — no finding without files / facts
3. **Smaller than the problem** — recommendations cheaper than the risk
4. **Protect the good** — call out what agents must not “improve”
5. **Human + agent** — clarity for you; a plan-shaped prompt for the agent

---

## Repo layout

```text
skills/
├── grill-me-softly/
│   ├── SKILL.md
│   └── agents/
└── safe-architecture-audit/
    ├── SKILL.md
    └── references/
```

---

## License

MIT © LexVolkov

---
