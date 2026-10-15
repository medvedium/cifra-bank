---
name: site-roadmap
description: >-
  Reads and updates docs/roadmap.md — the project source of truth for done work
  and next steps. Use at the start of a new chat, when picking the next task,
  or when finishing a feature/component so the roadmap stays current.
---

# Site roadmap SOT

## File

`docs/roadmap.md`

## Start of chat / picking work

1. Read `docs/roadmap.md`.
2. Propose or do the first item in **Next**, unless the user named another task.
3. Open only files needed for that item (`@` those paths).

## End of task (required)

Update `docs/roadmap.md` in the same turn as the wrap-up:

1. Set row statuses (`done` / `wip` / `todo` / `blocked`).
2. Refresh **Next** (1–3 concrete bullets).
3. Prepend a dated **Changelog** entry (facts only).
4. Set `Обновлено: YYYY-MM-DD`.

## Brief for user (new chat)

```text
Задача: следующий пункт из @docs/roadmap.md (или: <своя задача>)
Файлы: @docs/roadmap.md + нужные пути из roadmap
Ограничения: pnpm; не коммитить без просьбы
По завершении: обновить docs/roadmap.md
```
