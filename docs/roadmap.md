# Roadmap — cifra-bank.ru

> **Source of truth** для статуса работ. Любой новый чат: сначала прочитай этот файл (`@docs/roadmap.md`), бери задачу из **Next**, по завершении обнови статусы и **Changelog**.

Обновлено: 2026-11-04

## Next (что брать в работу)

1. **Курсы валют на главной** — UI по `bank_source` / `ind-homepage` (`#rates`); common JSON курсов; модалка брони на FormFlow (mock submit).
2. **SMS UX вторым проходом** — таймер resend, лимит попыток (после курсов или параллельно).
3. **Главная — остальные секции** / Hero-хвосты / Theme toggler — по приоритету.

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
| Static export (`build:static`) | `done` | Скрипт в `package.json` |

### Главная `/`

| Блок | Статус | Файлы / заметки |
|------|--------|-----------------|
| Hero (Banner / Slider / Inform, Swiper) | `done` | `src/components/features/Hero/*`, 11 слайдов в `content/pages/home.json` |
| Hero content + desktop images | `done` | `public/assets/images/homepage/` |
| Hero modal CTA / mobile images / pixel polish | `todo` | Дизайн + доработки |
| Популярные продукты | `done` | `CardLink`, картинки в `public/assets/images/homepage/` |
| Калькулятор вклада | `done` | `src/components/features/DepositCalculator/*`, секция на `(retail)/page.tsx` |
| Калькулятор / блок курсов валют | `todo` | Эталон: `bank_source` (не прод). FormFlow готов — можно блок + бронь |
| Остальные секции как на cifra-bank.ru | `todo` | Apps, news… |

### Другие страницы

| Страница | Статус | Заметки |
|----------|--------|---------|
| Service packages `/service-packages` | `wip` | Фичи + JSON есть; сверять с продом |
| Search `/search` | `wip` | Client loader под static export |
| Offices `/offices-and-atms` | `wip` | Заготовка маршрута |
| Corporate `/corporate`, SBP, RKO | `wip` | На главной ЮЛ продукты через `CardLink`. Остальные маршруты — каркас |
| 404 | `done` | `NotFound` + `content/pages/not-found.json` |

## Changelog (кратко, новые сверху)

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
