---
name: spilnaknyha-turn
description: >-
  Write one Spilna Knyha turn that fits the book it joins: read the Charter,
  lore, and recent turns first; match the book's language, tone, POV, and
  voice; keep canon; leave the next author a hook; pass an anti-slop gate
  before submit. Use when writing or revising a turn/fragment for a
  spilnaknyha book, continuing another author's scene, or matching a
  co-author's style.
license: MIT
---

# Spilna Knyha: writing a turn

One turn. It belongs to the book, not to you. Continue what exists; do not
demonstrate prose.

Tool mechanics live in `spilnaknyha-mcp` (install it alongside). This skill
covers only the writing.

## 1. Read before you write

1. `read_charter` — `meta.lang`, `meta.genre`; `values`: `worldTone`,
   `worldEra`, `magic`, `turnLimitChars`, `characterMode`, `forKids`,
   `contentWarnings`.
2. `list_lore` + `get_lore` — every character, place, and term you may touch.
3. `list_turns` for the index, then `get_turns` for the last three fragments.
   Add the chapter opening if you start a new scene.
4. `list_members` — resolve handles; never invent names.

Nothing below replaces the actual text.

## 2. Voice card

Before drafting, write five lines in the reply (not into the book). Template
and a filled example: `references/voice-card.md`.

1. POV and tense.
2. Sentence shape — length, commas, fragments, dashes.
3. Dialogue — quote style, tags, beats.
4. Register and humor.
5. Images and motifs already in play.

Match the card. If the book's prose is rough, stay rough: consistency beats
polish. Do not correct another author's typos or "improve" their voice.
On the first turn of a book, build the card from the Charter tone and genre.

## 3. Write the turn

- **Language** — `meta.lang` exactly. No switching, no translating mid-book.
- **Length** — `turnLimitChars` is a ceiling, not a target. Match the scale of
  the recent turns; when in doubt, use 60–80% of the cap so the next author
  has room.
- **Scope** — one scene, one move. Start on action, not on a recap.
- **Advance** — something changes: a decision, an arrival, a discovery, a
  refusal.
- **End with a hook** — a sound, an unanswered line, a choice. Never a
  summary or a moral.
- **Other authors' characters** — stay in your own PC's POV. Another author's
  PC: outside view only, unless the book already writes cross-POV; then match
  that pattern, never reveal their secrets, and never make a decision that
  closes their arc. No death of another author's PC unless
  `killAuthorCharacters` allows it.
- **New canon** — one small thing per turn. Anything that must be remembered
  beyond the scene: ask about a lore card instead of inventing it.
- **Chapter** — do not close it (`chapterFinal`) unless asked.
- **Challenge mode** — fulfil the card inside the story; never name it.

Defects: POV slips, replaying a beat, "meanwhile, elsewhere" cuts that steal
the next author's move.

## 4. Anti-slop gate

Run this before preview. Full list with Ukrainian/Russian examples:
`references/anti-slop-uk.md`.

Fail the draft if it has:

- "not X, but Y" reversals; "у світі, де…"; "повітря густе від…"
- an emotion named after it was shown ("вона відчула страх")
- body clichés — heart like a bird, cold down the spine, lump in the throat
- decorative triads; identical sentence or paragraph lengths
- adverb padding (раптом, повільно, тихо) that changes nothing
- three similes where one concrete detail would do
- ornate dialogue tags; "said" is enough
- an epiphany or mic-drop last line
- a sentence that could move to any other book unchanged

English books: the usual AI words (delve, tapestry, testament, realm,
palpable) are banned too.

## 5. Canon check

- Names, gender, roles, relationships — from lore, not memory.
- Timeline — from the turns; do not replay a beat already played.
- Abilities and objects — only what lore or turns established.
- If the source contradicts itself, ask; do not pick silently.

## 6. Preview and submit

Follow `spilnaknyha-mcp` for tool calls. Before the preview, show:

- the draft;
- the five-line voice card;
- the character count;
- one line: "canon checked against lore + last 3 turns".

Then `submit_turn` without confirm. Use `confirm: true` only after explicit
agreement, and say that it deletes the web draft.

## Self-check

- [ ] language matches `meta.lang`
- [ ] under `turnLimitChars`
- [ ] POV and tense match the last turn
- [ ] no new named character without lore
- [ ] no contradiction with lore or the last three turns
- [ ] ends on a hook, not a summary
- [ ] no banned pattern from the gate
- [ ] reads aloud without wincing

## Not this skill

- Not a plot generator. If the book has no direction, ask.
- Not a rewriter of other authors' turns. `edit_turn` only if `editable`.
- Not a translator. Translating an existing turn is a separate pass; the same
  gate applies.
