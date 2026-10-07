import type { CSSProperties } from 'react'
import type { HeroCta, HeroCtaAction, HeroItem } from '@/lib/content/types'

type ButtonColor = 'primary' | 'secondary' | 'white'
type ButtonVariant = 'contained' | 'text'

export function resolveBackground(background?: HeroItem['background']): string | undefined {
    if (!background) {
        return undefined
    }

    if (Array.isArray(background)) {
        const [from, to] = background
        return `linear-gradient(90deg, ${from}, ${to})`
    }

    return background
}

function parseHex(color: string): { r: number; g: number; b: number } | null {
    const value = color.trim()
    const short = /^#([\da-f]{3})$/i.exec(value)
    if (short) {
        const [r, g, b] = short[1].split('').map((char) => Number.parseInt(char + char, 16))
        return { r, g, b }
    }

    const full = /^#([\da-f]{6})$/i.exec(value)
    if (full) {
        return {
            r: Number.parseInt(full[1].slice(0, 2), 16),
            g: Number.parseInt(full[1].slice(2, 4), 16),
            b: Number.parseInt(full[1].slice(4, 6), 16)
        }
    }

    return null
}

function isLightColor(color?: string): boolean {
    if (!color) {
        return false
    }

    const rgb = parseHex(color)
    if (!rgb) {
        return false
    }

    const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255
    return luminance > 0.65
}

/** Тон хрома (пагинация/стрелки): dark = светлые контролы на тёмном фоне. */
export function resolveSlideTone(slide: HeroItem): 'light' | 'dark' {
    if (isLightColor(slide.titleColor) || isLightColor(slide.textColor) || isLightColor(slide.markColor)) {
        return 'dark'
    }

    if (typeof slide.background === 'string' && !isLightColor(slide.background) && parseHex(slide.background)) {
        return 'dark'
    }

    if (Array.isArray(slide.background)) {
        const [from] = slide.background
        if (from && !isLightColor(from) && parseHex(from)) {
            return 'dark'
        }
    }

    return 'light'
}

export function getSlideStyle(slide: HeroItem): CSSProperties {
    const style: CSSProperties & Record<`--${string}`, string> = {}
    const background = resolveBackground(slide.background)

    if (background) {
        style.background = background
    }

    if (slide.markColor) {
        style['--hero-mark-color'] = slide.markColor
        style['--hero-mark-border'] = slide.markColor
    }

    if (slide.titleColor) {
        style['--hero-title-color'] = slide.titleColor
    }

    if (slide.textColor) {
        style['--hero-text-color'] = slide.textColor
    }

    return style
}

export function mapCtaAppearance(className?: string): { color: ButtonColor; variant: ButtonVariant } {
    const value = (className || 'primary').toLowerCase()

    if (value.includes('text') || value.includes('link')) {
        return { color: 'secondary', variant: 'text' }
    }

    if (value.includes('secondary') || value.includes('gray') || value.includes('grey')) {
        return { color: 'secondary', variant: 'contained' }
    }

    if (value.includes('white')) {
        return { color: 'white', variant: 'contained' }
    }

    return { color: 'primary', variant: 'contained' }
}

export function resolveCtaAction(cta: HeroCta): HeroCtaAction {
    if (cta.action) {
        return cta.action
    }

    return cta.href ? 'link' : 'none'
}

export function stripHtml(value: string): string {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function getPrimaryCtaHref(slide: HeroItem): string {
    const cta = slide.ctas?.find((item) => {
        const action = resolveCtaAction(item)
        return item.href && (action === 'link' || action === 'blank' || action === 'scroll')
    })

    return cta?.href || '#'
}
