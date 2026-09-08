import { getCorporateHomePage, getFooter, getHomePage, getNavigation } from '@/lib/content/loader'
import type { FooterNavGroup, HomePage, MainMenuItem, MenuItem, Navigation, SearchHit } from '@/lib/content/types'

export { SEARCH_PAGE_SIZE, displaySearchUrl, formatSearchCount, getPageTokens } from '@/lib/search/helpers'
export type { PageToken } from '@/lib/search/helpers'

const RETAIL_KEYWORDS = 'частным лицам физические лица'
const CORPORATE_KEYWORDS = 'для бизнеса юридические лица юридическим лицам'

interface IndexedHit extends SearchHit {
    keywords: string
}

function normalizeHref(href: string): string | null {
    const trimmed = href.trim()

    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('tel:') || trimmed.startsWith('mailto:') || trimmed.startsWith('javascript:')) {
        return null
    }

    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed.replace(/\/$/, '')
    }

    const [path = '', hash] = trimmed.split('#')
    const pathname = (path.startsWith('/') ? path : `/${path}`).replace(/\/$/, '') || '/'

    return hash ? `${pathname}#${hash}` : pathname
}

function hrefKey(href: string) {
    return href.replace(/\/$/, '').toLowerCase()
}

class SearchIndex {
    private items = new Map<string, IndexedHit>()

    add(title: string, category: string, href: string, keywords: string) {
        const normalized = normalizeHref(href)

        if (!normalized) {
            return
        }

        const key = hrefKey(normalized)
        const next: IndexedHit = { title: title.trim(), category, href: normalized, keywords }
        const current = this.items.get(key)

        if (!current || next.title.length > current.title.length) {
            this.items.set(key, next)
        }
    }

    toArray() {
        return [...this.items.values()]
    }
}

function retailCategory(parent?: string) {
    if (parent === 'О банке') {
        return 'О банке'
    }

    return parent || 'Частным лицам'
}

function corporateCategory(href: string, parent?: string) {
    if (parent === 'О банке') {
        return 'О банке'
    }

    if (normalizeHref(href) === '/corporate') {
        return 'Юридические лица'
    }

    return 'Продукты для юридических лиц'
}

function keywordsFor(audience: 'retail' | 'corporate', category: string) {
    if (audience === 'corporate' && category !== 'О банке') {
        return CORPORATE_KEYWORDS
    }

    return RETAIL_KEYWORDS
}

function collectMenuItems(index: SearchIndex, items: MainMenuItem[], audience: 'retail' | 'corporate') {
    for (const item of items) {
        if (item.href) {
            const category = audience === 'corporate' ? corporateCategory(item.href) : retailCategory()
            index.add(item.label, category, item.href, keywordsFor(audience, category))
        }

        if (!item.dropdown) {
            continue
        }

        for (const column of item.dropdown.columns) {
            collectLinks(index, column, audience, item.label)
        }

        if (item.dropdown.aside) {
            collectLinks(index, item.dropdown.aside.links, audience, item.label === 'О банке' ? 'О банке' : item.label)
        }
    }
}

function collectLinks(index: SearchIndex, links: MenuItem[], audience: 'retail' | 'corporate', parent?: string) {
    for (const link of links) {
        const category = audience === 'corporate' ? corporateCategory(link.href, parent) : retailCategory(parent)
        index.add(link.label, category, link.href, keywordsFor(audience, category))
    }
}

function collectHome(index: SearchIndex, page: HomePage, audience: 'retail' | 'corporate') {
    const keywords = audience === 'corporate' ? CORPORATE_KEYWORDS : RETAIL_KEYWORDS
    const fallbackCategory = audience === 'corporate' ? 'Продукты для юридических лиц' : 'Частным лицам'

    for (const item of page.hero.items) {
        index.add(item.title, item.mark || fallbackCategory, item.cta.href, `${keywords} ${item.description ?? ''} ${item.features?.join(' ') ?? ''}`)
    }

    if (audience === 'retail') {
        for (const item of page.products.items) {
            index.add(item.title, fallbackCategory, item.href, keywords)
        }
    }
}

function collectFooter(index: SearchIndex, groups: FooterNavGroup[]) {
    for (const group of groups) {
        const audience = group.title === 'Юридические лица' ? 'corporate' : 'retail'
        const category = group.title === 'О банке' ? 'О банке' : group.title

        for (const column of group.columns) {
            for (const link of column) {
                const itemCategory = category === 'Юридические лица' && normalizeHref(link.href) !== '/corporate' ? corporateCategory(link.href) : category
                index.add(link.label, itemCategory, link.href, keywordsFor(audience, itemCategory))
            }
        }
    }
}

async function buildIndex(): Promise<IndexedHit[]> {
    const [retail, corporate, home, corporateHome, footer] = await Promise.all([
        getNavigation('retail'),
        getNavigation('corporate'),
        getHomePage(),
        getCorporateHomePage(),
        getFooter()
    ])

    const index = new SearchIndex()

    collectHome(index, home, 'retail')
    collectHome(index, corporateHome, 'corporate')
    collectMenuItems(index, retail.mainMenu, 'retail')
    collectMenuItems(index, corporate.mainMenu, 'corporate')
    collectTopLinks(index, retail)
    collectFooter(index, footer.nav.primary)
    collectFooter(index, footer.nav.secondary)

    return index.toArray()
}

function collectTopLinks(index: SearchIndex, navigation: Navigation) {
    for (const link of navigation.topLinks) {
        index.add(link.label, link.label, link.href, RETAIL_KEYWORDS)
    }

    for (const link of navigation.topSideLinks) {
        index.add(link.label, 'О банке', link.href, RETAIL_KEYWORDS)
    }
}

function matches(hit: IndexedHit, query: string) {
    const haystack = `${hit.title} ${hit.category} ${hit.href} ${hit.keywords}`.toLowerCase()

    if (haystack.includes(query)) {
        return true
    }

    return query.split(/\s+/).filter(Boolean).every((word) => haystack.includes(word))
}

export async function getSearchHits(query: string): Promise<SearchHit[]> {
    const normalized = query.trim().toLowerCase()

    if (!normalized) {
        return []
    }

    const index = await buildIndex()

    return index
        .filter((hit) => matches(hit, normalized))
        .map(({ title, category, href }) => ({ title, category, href }))
}
