---
name: hero-swiper
description: >-
  Hero banner/slider architecture with Swiper: Banner, Inform, dual-swiper sync,
  autoplay vs viewport, pagination progress. Use when working on Hero, HeroSlider,
  HeroBanner, HeroInform, or intro-style Swiper on cifra-bank.ru.
---

# Hero + Swiper

## Structure

```text
Hero.tsx              # server-safe orchestrator: 0 / 1 / N slides
HeroBanner.tsx        # dumb single banner (no Swiper knowledge)
HeroInform.tsx        # dumb cards; null if no items
HeroSlider.tsx        # 'use client' — banner Swiper + inform Swiper
```

- `slides.length === 0` → `null`
- `=== 1` → `HeroBanner` + `HeroInform` (no Swiper)
- `> 1` → `HeroSlider`

## Dual Swiper (as on prod)

1. **Banner Swiper**: `EffectFade`, `crossFade`, `loop`, `Autoplay`, custom prev/next via `slidePrev`/`slideNext` (refs + onClick; don’t rely on Navigation `prevEl` timing).
2. **Inform Swiper**: `EffectFade`, `crossFade`, `autoHeight`, `allowTouchMove: false`, **no loop**.
3. Sync: `onSlideChange` → `informSwiper.slideTo(banner.realIndex)` (use `realIndex` because banner has `loop`).

Empty inform slide → `HeroInform` returns `null` → height 0 via `autoHeight`.

## Autoplay + IntersectionObserver

- Observe the **banner wrap** (`swiperWrap`), not the whole page.
- Prefer `autoplay.stop()` / `start()` with saved `timeLeft` over `pause()` / `resume()`.
- Reason: with `effect: 'fade'`, default `waitForTransition: true` makes `pause()` auto-resume on `transitionend` or leave autoplay stuck `paused`. Set `waitForTransition: false` for Hero.
- On leave: save `autoplay.timeLeft`, then `stop()`.
- On enter: temporarily set `params.autoplay.delay = remaining`, `start()`, restore full delay on next `slideChange`.

## Pagination progress (active bullet)

- Drive fill from `onAutoplayTimeLeft`: progress `1 - timeLeft / AUTOPLAY_DELAY_MS`.
- Prefer **linear-gradient on the active bullet** via CSS var `--bullet-progress` on the wrap — more reliable than an inner span + `opacity` (CSS Modules nesting with `:global` often breaks).
- Active width `64px`; inactive `6px`.
- Width transition: only on `.swiper-pagination-bullet-active` (grow animated). Base bullets `transition: none` so the old active **snaps** to 6px — avoids two wide bullets at once.
- Empty `.inView {}` rules may be stripped by the bundler → `styles.inView === undefined` in DOM. Put a real property (e.g. `--hero-in-view: 1`).

## CSS Modules + Swiper

- Scope Swiper overrides under a local class: `.swiper { :global(.swiper-pagination-bullet) { … } }`.
- Never top-level `:global(.swiper-button-next)` alone — leaks to every Swiper on the page.
- For hit-area / third-party classes that fight Modules, use higher specificity + `!important` sparingly on width/opacity.

## Icons

- Slider chevrons: `ChevronLeftIcon` / `ChevronRightIcon` in `src/components/ui/Icons` (`stroke="currentColor"`).

## Out of scope / later

- CTA `action` (`blank` / `modal` / `scroll`) full handling
- Pixel-perfect parity of every prod breakpoint (iterate against cifra-bank.ru as needed)
---

## Checklist before calling Hero “done”

- [ ] 1 slide: no Swiper, banner + inform
- [ ] N slides: fade banners, synced inform, autoHeight collapse
- [ ] Autoplay pauses out of view and resumes with remaining time
- [ ] Active bullet widens + green progress; no double-wide jerk on change
- [ ] Custom arrows work (desktop)
