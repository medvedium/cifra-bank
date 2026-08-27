# cifra-bank.ru

Репозиторий нового фронтенда [cifra-bank.ru](https://cifra-bank.ru) на Next.js. Переводим публичный сайт с текущего стека на App Router, не меняя контентную модель: страницы и навигация живут в JSON и подключаются через загрузчик.

Продакшен пока на старом фронте. Этот проект — целевая реализация.

## Стек

- Next.js 16, App Router
- React 19, TypeScript
- Sass: SCSS-модули у компонентов, токены и глобальные стили в `src/styles`

## Что уже есть

- Контент в `content/` (`site.json`, `navigation/`, `pages/`)
- Загрузчик `src/lib/content/loader.ts` и типы в `src/lib/content/types.ts`
- SEO через `src/lib/seo/metadata.ts` (`title`, `description`, canonical, Open Graph)
- Общая оболочка `SiteShell` в layout сегмента: `(retail)` и `corporate` со своим `audience`
- Страницы: главная, пакеты услуг, офисы и банкоматы
- Дизайн-система: цвета, типографика (GT America + Stolzl), брейкпоинты через `@include from(md|xl)`

## Структура

```
content/          JSON: сайт, навигация, страницы
public/           статика
src/app/          маршруты App Router
  layout.tsx      html, шрифты, тема
  (retail)/       частные лица — SiteShell audience="retail"
  corporate/      юридические лица — SiteShell audience="corporate"
src/components/   layout, ui, features
src/lib/          загрузка контента, SEO, тема
src/styles/       токены, брейкпоинты, глобальные стили
src/fonts/        локальные шрифты (next/font/local)
```

Новая страница кладётся в нужный сегмент (`(retail)` или `corporate`) — оболочка подтянется из layout. Навигация — `content/navigation/<audience>.json`. Скобки у `(retail)` в URL не попадают.

## Стили

Компонент — свой `*.module.scss`. Общие переменные — `src/styles/_variables.scss`. Медиазапросы — mobile-first, миксин из `src/styles/_breakpoints.scss`:

```scss
@use '@/styles/breakpoints' as *;

.block {
	padding: 16px;

	@include from(md) {
		padding: 32px;
	}
}
```

`md` — 768px, `xl` — 1280px.

## Запуск

```bash
npm install
npm run dev
```

Сборка и линт: `npm run build`, `npm run lint`.

## Дальше по миграции

- Раздел для юридических лиц (corporate / `business`)
- Private Banking — отдельный layout
- Остальные продуктовые страницы с текущего сайта
- `sitemap.xml` и `robots.txt`
