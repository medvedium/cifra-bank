# Roadmap — cifra-bank.ru

> **Source of truth** для статуса работ. Любой новый чат: сначала прочитай этот файл (`@docs/roadmap.md`), бери задачу из **Next**, по завершении обнови статусы и **Changelog**.

Обновлено: 2026-10-15

## Next (что брать в работу)

1. **Главная — блок «Популярные продукты»**: картинки/`imageUrl` в `content/pages/home.json` сейчас пустые; сверстать/дотянуть ассеты с прода.
2. **Главная — остальные секции с прода** (курсы валют, приложения, новости/актуальное и т.д.) — контент + компоненты по мере приоритета.
3. **Hero — хвосты**: modal CTA (приложение), mobile art-direction картинки, полировка высоты/вида с дизайнерами.
4. **Theme toggler** — в `src/app/layout.tsx` есть TODO «переписать».

Порядок можно менять; в чате явно скажи, если берёшь не первый пункт.

## Status legend

| Статус | Значение |
|--------|----------|
| `done` | В main / принято, можно опираться |
| `wip` | В работе или частично |
| `todo` | Запланировано, не начато |
| `blocked` | Ждёт дизайн / контент / решение |

## Карта сайта (высокий уровень)

| Область | Статус | Заметки |
|---------|--------|---------|
| Каркас Next (app router, layout, SEO helpers) | `done` | См. `src/app`, `src/lib` |
| Header / MobileMenu / Search в шапке | `done` | `src/components/layout/Header` |
| Footer + city select | `done` | `src/components/layout/Footer` |
| Theme toggler | `wip` | TODO в `src/app/layout.tsx` |
| UI-kit (Button, Tabs, TextLink, Logo, Icons…) | `wip` | База есть; расширять по нуждам страниц |
| Cursor rules/skills | `done` | `.cursor/rules`, `.cursor/skills` |
| Static export (`build:static`) | `done` | Скрипт в `package.json` |

### Главная `/`

| Блок | Статус | Файлы / заметки |
|------|--------|-----------------|
| Hero (Banner / Slider / Inform, Swiper) | `done` | `src/components/features/Hero/*`, 11 слайдов в `content/pages/home.json` |
| Hero content + desktop images | `done` | `public/assets/images/homepage/` |
| Hero modal CTA / mobile images / pixel polish | `todo` | Дизайн + доработки |
| Популярные продукты (тексты) | `wip` | Секция на странице есть; **без картинок** |
| Остальные секции как на cifra-bank.ru | `todo` | Rates, apps, news… |

### Другие страницы

| Страница | Статус | Заметки |
|----------|--------|---------|
| Service packages `/service-packages` | `wip` | Фичи + JSON есть; сверять с продом |
| Search `/search` | `wip` | Client loader под static export |
| Offices `/offices-and-atms` | `wip` | Заготовка маршрута |
| Corporate `/corporate`, SBP, RKO | `wip` | Каркас маршрутов; наполнение по приоритету |
| 404 | `done` | `NotFound` + `content/pages/not-found.json` |

## Changelog (кратко, новые сверху)

### 2026-10-15

- Hero пересобран: `Hero` → `HeroBanner` / `HeroSlider` / `HeroInform` (Swiper, sync inform, autoplay, progress).
- Контент hero главной: 11 слайдов + desktop-ассеты.
- Добавлены Cursor rules/skills (`hero-swiper`, `git-pr-prep`, `prod-content-migrate`, `focused-agent-chat`).
- Заведён этот roadmap как SOT.

## Как обновлять (для агента)

После завершения задачи в чате:

1. Поставь статусы `done` / `wip` / `todo` в таблицах.
2. Перепиши **Next** (1–3 пункта, конкретные).
3. Добавь 1–5 буллетов в **Changelog** с датой.
4. Обнови строку «Обновлено: YYYY-MM-DD» вверху.
5. Не раздувай файл историей переписок — только факты и следующие шаги.
