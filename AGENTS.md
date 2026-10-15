<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor agent guidance

- Rules: `.cursor/rules/*.mdc` (workflow, content JSON, components).
- Skills: `.cursor/skills/*/SKILL.md`:
  - `hero-swiper` — Hero Banner/Inform/Swiper sync, autoplay, pagination
  - `git-pr-prep` — план ветки / файлов / коммита / PR перед пушем
  - `prod-content-migrate` — контент с прода в JSON/assets
  - `focused-agent-chat` — короткий бриф для нового чата
- Package manager: **pnpm**.
