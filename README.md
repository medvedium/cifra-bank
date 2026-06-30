# Цифра банк — учебный проект

Проект очищен. Сборка идёт по шагам с ментором в Cursor.

## Стек

- Next.js 16 (App Router)
- TypeScript
- **SCSS Modules** (`*.module.scss`) — стили компонентов
- `src/styles/globals.scss` — глобальные стили и CSS-переменные

## Прогресс

- [ ] Шаг 1 — Контент в JSON
- [ ] Шаг 2 — Загрузчик контента
- [ ] Шаг 3 — Первая страница с данными из JSON
- [ ] Шаг 4 — SEO (metadata)
- [ ] Шаг 5 — Layout: Header и Footer
- [ ] Шаг 6 — SiteShell
- [ ] Шаг 7 — Вторая страница (продукт)
- [ ] Шаг 8 — Раздел corporate
- [ ] Шаг 9 — Private Banking с отдельным layout
- [ ] Шаг 10 — sitemap и robots

## Стили

Каждый компонент/страница — свой файл `ComponentName.module.scss`:

```tsx
import styles from "./Header.module.scss";

export function Header() {
  return <header className={styles.header}>...</header>;
}
```

Общие переменные — в `src/styles/_variables.scss` (создашь позже при необходимости).

## Запуск

```bash
npm install
npm run dev
```
