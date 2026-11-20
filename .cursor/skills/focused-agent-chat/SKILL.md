---
name: focused-agent-chat
description: >-
  Helps start a new Cursor agent chat with a tight brief to save tokens.
  Use when the user asks how to continue work in a new chat, split context,
  or hand off a component/feature to a fresh agent session.
---

# Focused agent chat

## When to suggest a new chat

- New component/feature, or the current thread is long and answers drift.
- Same file later after a break — new chat + `@file` is cheaper than replaying history.

## Brief template (give the user this to paste)

```text
Задача: следующий пункт из @docs/roadmap.md
  (или явно: <одна цель>)
Файлы: @docs/roadmap.md @path1 @path2
Режим: ментор. Код пишет пользователь. Агент проверяет решения и даёт следующее задание. Код агент пишет только если пользователь явно попросил.
Ограничения: pnpm; не коммитить без просьбы; не работать в main — в начале этапа новая ветка
По завершении: обновить @docs/roadmap.md (статусы, Next, Changelog)
Критерий готовности: <как проверить>
```

## Agent behavior in the new chat

1. Read `@docs/roadmap.md` first, then only the named feature files.
2. **Branch at start of the stage:** if on `main`/`master` (or unrelated branch), propose a name (`feature/…` / `fix/…` / `chore/…`) and create/switch before code changes. Tell the user the branch name.
3. Follow `.cursor/rules` and project skills; don’t re-ask settled conventions.
4. Don’t summarize old mega-threads — work from roadmap + code.
5. Mentor mode from the brief: review the user’s code and give the next assignment. Write code only when the user explicitly asks.
6. When the task is accepted/done, update the roadmap (skill `site-roadmap`).
