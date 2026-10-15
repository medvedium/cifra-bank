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
Задача: <одна цель>
Контекст: уже сделано <1–3 пункта>
Файлы: @path1 @path2
Ограничения: не коммитить / не трогать X / pnpm
Критерий готовности: <как проверить>
```

## Agent behavior in the new chat

1. Read only the named files (and types they import) before editing.
2. Follow `.cursor/rules` and project skills; don’t re-ask settled conventions.
3. Don’t summarize the old mega-thread — work from the brief + code.
