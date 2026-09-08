export const SEARCH_PAGE_SIZE = 10

export function formatSearchCount(count: number, prefix: string, variants: { one: string; few: string; many: string }) {
    const abs = Math.abs(count) % 100
    const last = abs % 10
    const variant = abs > 10 && abs < 20 ? variants.many : last > 1 && last < 5 ? variants.few : last === 1 ? variants.one : variants.many

    return `${prefix} ${count} ${variant}`
}

export function displaySearchUrl(baseUrl: string, href: string) {
    if (/^https?:\/\//i.test(href)) {
        return href
    }

    return `${baseUrl}${href.startsWith('/') ? href : `/${href}`}`
}

export type PageToken = number | 'ellipsis'

export function getPageTokens(current: number, total: number): PageToken[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, index) => index + 1)
    }

    if (current <= 4) {
        return [1, 2, 3, 4, 5, 'ellipsis', total]
    }

    if (current >= total - 3) {
        return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total]
    }

    return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total]
}
