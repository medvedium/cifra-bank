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
3. **Branch before code:** if on `main`/`master` (or an unrelated feature branch), name a branch for this stage (`feature/…` / `fix/…` / `chore/…` from `git-pr-prep`) and create/switch to it. Tell the user the name. Do not commit unless asked.
4. Open only files needed for that item (`@` those paths).

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
Режим: ментор. Код пишет пользователь. Агент проверяет решения и даёт следующее задание. Код агент пишет только если пользователь явно попросил.
Ограничения: pnpm; не коммитить без просьбы; в начале этапа — новая ветка (агент называет имя)
По завершении: обновить docs/roadmap.md
```
