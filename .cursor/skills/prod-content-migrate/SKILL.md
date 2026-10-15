---
name: prod-content-migrate
description: >-
  Migrates marketing content from the live cifra-bank.ru site into local
  content/pages JSON and public assets. Use when filling hero/sections from
  production, scraping intro slides, or downloading homepage images.
---

# Migrate content from production

## Workflow

1. Fetch the live page HTML (e.g. `https://cifra-bank.ru/`).
2. Parse the relevant block (Hero = `.intro__item` slides + synced `.inform` swiper).
3. Map into local types (`HeroItem`, etc.) — mirror the style of already-filled JSON on that page.
4. Download desktop (and mobile if needed) images into `public/assets/images/<section>/`.
5. Wire `src` paths; prefer webp when PNG is huge.
6. Resolve short Bitrix links (`/~xxxxx`) to final paths before saving hrefs.
7. Validate JSON parses; do not invent rates/legal footnotes.

## Hero mapping cheatsheet

| Prod | Local JSON |
|------|------------|
| `intro__item-mark` | `mark` |
| `intro__item-title` (HTML) | `title` |
| `intro__item-text` (HTML) | `description` |
| `ui-btn--primary` / `--light` | `ctas[].className` `primary` / `light` |
| `target="_blank"` | `action: "blank"` |
| `data-scroll-to` | `action: "scroll"`, `href` = selector |
| `#popup-...` / modal classes | `action: "modal"` |
| `intro__item--investor` gradient | `background: ["#03ec5f", "#008b60"]` |
| `intro__item--offer` | `background: "#1c1c1c"` + light text colors |
| inline `background: #eaf1ff` | `background: "#eaf1ff"` |
| inform cards for slide N | `inform: [{ title, text }]` (plain text; no HTML in inform UI) |

## Do not

- Replace the user’s carefully authored slides without need.
- Commit secrets or dump entire HTML into the repo.
