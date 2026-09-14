---
name: grill-me-softly
description: >-
  Soft grilling: interview only high-stakes product or architecture decisions
  that are expensive to reverse later. Skips look-uppable facts, conventions,
  and low-stakes polish. Use when the user asks grill-me-softly, soft grill,
  or wants grilling without low-stakes noise and without jargon they did not use.
license: MIT
disable-model-invocation: true
---

# Grill Me Softly

Interview until expensive-to-reverse decisions are settled. Self-contained — do not call a separate grilling skill.

## Filter

Ask **only** decisions where a wrong or deferred call now means painful rework later: data model / invariants, permissions, major system boundaries, irreversible product rules, migrations that touch existing users/data, public contracts others depend on.

**Do not ask** (settle yourself; note briefly if useful):

- anything look-uppable in the repo, `CONTEXT.md`, specs, i18n, UI patterns
- conventions the project already follows
- defaults that barely constrain the future
- polish, file naming, small UX tweaks, nice-to-have order of work

Test: *If we pick wrong or skip this and build for a month, how expensive is the undo?* Cheap → do not ask. Expensive → ask.

## Talk

- Match the user's language and address style (chat / user rules).
- Short, plain words. No engineer jargon unless they used that word first.
- If a term is unavoidable: one short plain gloss, then move on.
- Explain forks by consequences (“later we’d rebuild X / migrate all Y”), not implementation detail.
- Question body: 1–3 short sentences. Options in everyday language.
- Recommended answer: one plain sentence + why the reverse is costly.

## Round

Format:

```
❓ **Q1** - **<title>**: <body; options if useful>

➡️ <recommended answer>

---
```

- Prefer **1–3 questions per round**. Highest-cost blockers first.
- Facts are your job: look them up; never ask what you can find.
- After each round, one short line of what you **already decided yourself** (cheap / look-uppable) so the user can object — do not interrogate those.
- Wait for answers before the next round.

## Done

When no expensive-to-reverse decisions remain open, summarize: locked foundations, deferred cheap items, key rules.

Do not implement until the user confirms.

Inspired by [mattpocock/grill-me](https://github.com/mattpocock/skills) (MIT).
