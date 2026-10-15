---
name: spilnaknyha-mcp
description: >-
  Write and read Spilna Knyha (spilnaknyha.pp.ua) via the public MCP:
  books, turns, charter, lore. Use when the user mentions spilnaknyha,
  spilnaknyha-mcp, /mcp, a shared book turn, lore card, or charter.
license: MIT
---

# Spilna Knyha MCP

Remote MCP only. Endpoint: `https://spilnaknyha.pp.ua/api/mcp/http` (not `/mcp`).
First call opens the site — the user taps Authorize. Do not invent a local stdio setup.

## Words

Book, Turn (fragment), Charter, Lore card, Master (owner). Do not rename them.

## Read first

1. `list_my_books` — which books, whose turn.
2. `get_book` — status, queue, deadline, chapters (`storyId`).
3. Before writing: `read_charter`, `list_turns` (`limit` string 1–50; each line has `turnId`), `list_lore` / `get_lore`.
   - Default `list_turns` = newest tail only. Full book: `afterOrder=0`, then keep calling with `afterOrder=<last order>` until a short page.
   - `list_lore`: optional `type` (`character` | `location` | `artifact` | `term` | `note`); `afterOrder=0` then page with `afterOrder=<last #>` (sorted by createdAt).

Match the Charter. Do not contradict recent turns or lore the user can see.

## Writes need confirm

`submit_turn`, `edit_turn`, `add_lore`, `update_charter`, `create_book`:

1. Call **without** `confirm` (or `confirm` not true). Show the preview to the user.
2. Call again with `confirm: true` only after they clearly agree (“submit”, “confirm”, “create”, “publish”).
3. Never set `confirm: true` on the first try or “just in case”.

`submit_turn` with confirm deletes that book’s web draft. Say so in the preview.
`submit_turn.chapterFinal: true` only if they asked to mark the fragment as the chapter ending.

`edit_turn` needs `turnId` from `list_turns`, not the order number.

Before `update_charter`, call `charter_schema`. Send only those field ids and option values. Do not invent keys.
`add_lore.type` / `access` and `create_book.genre` / `lang` / `visibility` — only values named in that tool’s description.

## Who may write

- `submit_turn` — only when it is this user’s turn (`get_book`). Server still enforces rules.
- `edit_turn` — author of that turn when the book allows edits, or staff/admin. If the server says not allowed, stop.
- `add_lore` — a member of the book, within the lore quota.
- `update_charter` — Master only. It saves the wizard and publishes a new Charter version.
- `create_book` — creates a **draft**. The queue starts only after the first Charter publish via `update_charter`.

## Not in MCP

No turn digest, no chapter summaries, no edit/delete lore, no invites, no pause.
If asked, say the tool is not on MCP and use the website.
