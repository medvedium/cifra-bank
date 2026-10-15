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
Ограничения: не коммитить / не трогать X / pnpm
По завершении: обновить @docs/roadmap.md (статусы, Next, Changelog)
Критерий готовности: <как проверить>
```

## Agent behavior in the new chat

1. Read `@docs/roadmap.md` first, then only the named feature files.
2. Follow `.cursor/rules` and project skills; don’t re-ask settled conventions.
3. Don’t summarize old mega-threads — work from roadmap + code.
4. When the task is accepted/done, update the roadmap (skill `site-roadmap`).
