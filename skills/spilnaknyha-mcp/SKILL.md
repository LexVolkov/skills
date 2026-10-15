---
name: spilnaknyha-mcp
description: >-
  Write and read Spilna Knyha (spilnaknyha.pp.ua) via the public MCP:
  books, members, turns, chapters, charter, lore. Use when the user
  mentions spilnaknyha, spilnaknyha-mcp, /mcp, a shared book turn,
  lore card, charter, or chapter boundaries.
license: MIT
---

# Spilna Knyha MCP

Remote MCP only. Endpoint: `https://spilnaknyha.pp.ua/api/mcp/http` (not `/mcp`).
First call opens the site — the user taps Authorize. Do not invent a local stdio setup.
Install skill: `npx skills add LexVolkov/skills --skill spilnaknyha-mcp`.

## Words

Book, Turn (fragment), Chapter, Charter, Lore card.
Roles (book hierarchy, not platform admin): **Author** → **Editor** → **Manager** → **Deputy** → **Master**.
Codes: `author` | `editor` | `manager` | `deputy` | `master`. Master = book owner. Do not rename them.

## Tools (15)

Read: `list_my_books`, `get_book`, `list_members`, `read_charter`, `list_chapters`, `charter_schema`, `list_turns`, `list_lore`, `get_lore`.
Write (need confirm): `submit_turn`, `edit_turn`, `add_lore`, `update_charter`, `create_book`.
Session: `logout`.

## Read first

1. `list_my_books` — which books, whose turn.
2. `get_book` — status, queue, your uid, `allowEdit`, `lastClosedTurnOrder`, turn/chapter counts.
3. `list_members` — map `authorUid` → `@handle`, displayName, **role**, muted/banned/shadow, turnCount, «ви».
4. Before writing: `read_charter`, `list_chapters`, `list_turns`, `list_lore` / `get_lore`.

### Chapters

`list_chapters` — title, `closed`/`open`, fragment range: `fromOrder < order ≤ toOrder`.
Then load text with `list_turns` and `afterOrder=<fromOrder>` (stop when order > toOrder).

### Turns

- Default = newest **tail**. Full book: `afterOrder=0`, then `afterOrder=<last order>` until a short page (`limit` string 1–50).
- Each line has `turnId`, `authorUid`, `· ви` (yours), `· editable` or `· read-only`.
- Resolve names via `list_members`. Never invent handles.

### Lore

`list_lore`: optional `type` = `character` | `location` | `artifact` | `term` | `note`.
`afterOrder=0` then page with `afterOrder=<last #>` (sorted by createdAt). `get_lore` for one card.

Match the Charter. Do not contradict recent turns or lore the user can see.

## Writes need confirm

`submit_turn`, `edit_turn`, `add_lore`, `update_charter`, `create_book`:

1. Call **without** `confirm` (or not true). Show the preview to the user.
2. Call again with `confirm: true` only after they clearly agree (“submit”, “confirm”, “create”, “publish”).
3. Never set `confirm: true` on the first try or “just in case”.

`submit_turn` with confirm deletes that book’s web draft — say so in the preview.
`chapterFinal: true` only if they asked to end the chapter.
`edit_turn` needs `turnId` from `list_turns`, not the order number. Only if line says `editable`.

Before `update_charter`, call `charter_schema`. Send only those field ids/options.
`add_lore.type` / `access` and `create_book.genre` / `lang` / `visibility` — only values in that tool’s description.

## Who may write

- `submit_turn` — only on this user’s turn (`get_book`). Server enforces rules.
- `edit_turn` — only `editable` turns (own + `allowEdit`, or Manager/Deputy/Master staff rules; closed-chapter fragments are read-only unless platform admin).
- `add_lore` — book member, within lore quota.
- `update_charter` — **Master** only (wizard save + publish).
- `create_book` — **draft**; live queue starts after first Charter publish via `update_charter`.

## Not in MCP

No turn digest, no chapter summaries, no edit/delete lore, no invites, no pause.
If asked, say the tool is not on MCP and use the website.
