<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor agent guidance

- **Roadmap (SOT):** `docs/roadmap.md` — статус и следующие шаги. Новый чат: `@docs/roadmap.md`. По завершении задачи — обновить файл.
- Rules: `.cursor/rules/*.mdc` (workflow, roadmap, content JSON, components).
- Skills: `.cursor/skills/*/SKILL.md`:
  - `site-roadmap` — читать/обновлять `docs/roadmap.md`
  - `hero-swiper` — Hero Banner/Inform/Swiper sync, autoplay, pagination
  - `git-pr-prep` — план ветки / файлов / коммита / PR перед пушем
  - `prod-content-migrate` — контент с прода в JSON/assets
  - `focused-agent-chat` — короткий бриф для нового чата
- Package manager: **pnpm**.
