# Roadmap — cifra-bank.ru

> **Source of truth** для статуса работ. Любой новый чат: сначала прочитай этот файл (`@docs/roadmap.md`), бери задачу из **Next**, по завершении обнови статусы и **Changelog**.

Обновлено: 2026-11-10

## Next (что брать в работу)

1. **Private Banking** — новый раздел в этом приложении (`/private-banking`). Отдельный чат, когда будет макет и список страниц.
2. **Курсы валют на главной** — пауза. UI по `bank_source` / `ind-homepage` (`#rates`); common JSON; модалка брони на FormFlow (mock submit). Потом SMS UX (таймер resend, лимит попыток).

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
| UI-kit (Button, Tabs, TextLink, Logo, Icons…) | `done` | Button + калькуляторный набор принят: ChipRadio, Toggle, Field, Select (RAC), RangeSlider, RangeField, Tooltip, Switch. Стенд `/ui`. Helpers: `amountFormat`, `formatPeriod` |
| Калькулятор вклада | `done` | `DepositCalculator` на главной; `content/common/depo.json` + тексты в `home.json`; расчёт LWD/ED; тогглер только `rub:cifra` |
| Shared FormFlow / mock forms API | `done` | `FormFlow` + context; zod; stub SMS `123456`; `app/api/forms/*`; `?mock=error`; демо на `/ui` |
| Cursor rules/skills | `done` | `.cursor/rules`, `.cursor/skills` |
| Типографика | `done` | `fluid` 768–1440 в `:root`; line-height `1.3`; Header 6 Bold; caption desktop 14. Hero: заголовок h1, текст t1, бейдж t4 |
| Static export (`build:static`) | `done` | Скрипт в `package.json` |

### Главная `/`

| Блок | Статус | Файлы / заметки |
|------|--------|-----------------|
| Hero (Banner / Slider / Inform, Swiper) | `done` | Шрифты на ролях, отступ Inform и точки слайдера на `fluid`. 11 слайдов в `content/pages/home.json` |
| Hero content + desktop images | `done` | `public/assets/images/homepage/` |
| Hero modal CTA / mobile images / pixel polish | `todo` | Дизайн + доработки |
| Популярные продукты | `done` | `CardLink`, картинки в `public/assets/images/homepage/` |
| Калькулятор вклада | `done` | `src/components/features/DepositCalculator/*`, секция на `(retail)/page.tsx` |
| Калькулятор / блок курсов валют | `todo` | Пауза. Эталон: `bank_source` (не прод). FormFlow готов — блок + бронь |
| Остальные секции как на cifra-bank.ru | `todo` | Apps, news… |

### Другие страницы

| Страница | Статус | Заметки |
|----------|--------|---------|
| Service packages `/service-packages` | `wip` | Фичи + JSON есть; сверять с продом |
| Search `/search` | `wip` | Client loader под static export |
| Offices `/offices-and-atms` | `wip` | Заготовка маршрута |
| Corporate `/corporate`, SBP, RKO | `wip` | На главной ЮЛ продукты через `CardLink`. Остальные маршруты — каркас |
| 404 | `done` | `NotFound` + `content/pages/not-found.json` |
| Private Banking `/private-banking` | `todo` | Редизайн сразу здесь, после типографики. Ссылка уже в `content/footer.json` |

## Changelog (кратко, новые сверху)

### 2026-11-10

- Hero: бейдж на t4, заголовок карточки Inform берёт вес h5. Точки слайдера в ритме padding баннера, справа не ближе ширины стрелки. Токен `--banner-mark-border` убран.
- Отступ блока под баннером — `fluid(32px, 64px)`.

### 2026-11-09

- Типографика: роли h1–h6, t1–t4 и кнопки берут размер из `fluid`/`clamp` между mobile и desktop (768–1440). Line-height ролей — `1.3`. Лесенка шрифтов `from(md)` убрана. Header 6 — Bold, caption (t4) на desktop — 14. Лесенка Hero title/mark/description не менялась.
- Сырые `font-size: Npx` посажены на роли шкалы. Цифра 404 (100/140) вне шкалы, оставлена как есть.
- Курсы валют на паузе. Следующий раздел — Private Banking.

### 2026-11-04

- FormFlow **принят**: `fields→sms→result`, context вместо function-props, zod, mock API, stub `123456`, демо `/ui`.
- Следующее: блок курсов `#rates` + модалка брони на FormFlow.

### 2026-11-03

- Курсы валют / бронь: эталон — `bank_source` (`ind-homepage`), не текущий прод; фазы: FormFlow+mock → блок `#rates` + модалка (без реального submit).
- FormFlow MVP (старт): shared steps, zod, stub SMS, mock API + `?mock=error`.
- Калькулятор вклада **принят**: фича `DepositCalculator`, UI-kit + `depo.json`, тексты из `home.json`.
- Расчёт дохода по подходу calcDohod (LWD/ED); доходность из фактического income; дата старта с сервера (МСК).
- Тогглер капитализации: whitelist `rub:cifra`; ChipRadio/Field для срока; overflow чипов на мобиле.

### 2026-10-31

- `next` и `eslint-config-next`: 16.3.8 → 16.4.3 (патч октябрьских advisory, в т.ч. CVE-2026-94482).
- UI-kit калькулятора **принят** (Switch…RangeField, Tooltip); следующий шаг — сборка калькулятора вклада.
- RangeField: валюта в одном value с суммой; Backspace по ₽/пробелу → удаление цифры (`reconcileAmountDigits`).
- Tooltip: hover / click (Popover), крестик, `--tooltip-bg`; helpers `amountFormat`, `formatPeriod`; стенд `/ui`.

### 2026-10-22

- Популярные продукты на главной ФЛ и ЮЛ: `CardLink`, картинки, сетка с 1200 px.
- Hover карточки в тёмной теме красит текст в `--text-dark`.
- У корпоративного баннера описание-список. Контейнер держит 1200 px контента, padding снаружи.

### 2026-10-21

- Button приведён к макету DS: размеры large / medium / small с брейкпоинтом 768, цвета dark и error, hover-оверлеи, loading-спиннер.
- Hover кнопки снова плавный: оверлей проявляется за 0.3s.
- CTA в HeroBanner идут через Button: в JSON `color` вместо `className`, `action: blank` открывает новую вкладку, на зелёных баннерах кнопка белая.

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
