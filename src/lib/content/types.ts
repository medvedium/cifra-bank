export interface SiteSearch {
    action: string
    placeholder: string
    mobilePlaceholder: string
    toggleLabel: string
    submitLabel: string
    clearLabel: string
}

export interface SiteInfo {
    name: string
    baseUrl: string
    phones: Phones
    email: string
    search: SiteSearch
}

export interface Phones {
    russia: string
    russiaHref: string
    moscow: string
    moscowHref: string
}

export interface Seo {
    title: string
    description: string
}

/** Тексты блока калькулятора на странице (не тарифы — они в common/depo.json). */
export interface DepositCalculatorContent {
    title: string
    disclaimer: string
    footerText: string
    buttonLabel: string
    buttonHref: string
}

/** Id вкладки блока курсов (кроме служебного titles.calc). */
export type ExchangeRatesTabId = 'office' | 'online' | 'cards'

/** Тексты блока курсов на странице (цифры — в common/rates.json). */
export interface ExchangeRatesContent {
    title: string
    subtitle: string
    tabs: { id: ExchangeRatesTabId; value: string }[]
    titles: {
        office: string
        online: string
        cards: string
        calc: string
    }
    labels: {
        currency: string
        buy: string
        sell: string
        sellCol: string
        buyCol: string
        amount: string
        amountPlaceholder: string
        youGet: string
        buyAction: string
        sellAction: string
        officeSelect: string
        updatedPrefix: string
        documentsHint: string
        documentsLink: string
    }
    ctas: {
        online: { label: string; href: string }
        officeReserve: { label: string }
        cards: { label: string; href: string }
    }
    disclaimer: string
}

export interface HomePage {
    slug: string
    seo: Seo
    hero: {
        items: HeroItem[]
    }
    products: Products
    calculator: DepositCalculatorContent
    rates?: ExchangeRatesContent
}

export interface CorporateHomePage {
    slug: string
    seo: Seo
    hero: {
        items: HeroItem[]
    }
    products: Products
}

export interface PrivateAnchor {
    id: string
    label: string
}

export interface PrivatePartner {
    slug: string
    title: string
    partnerName: string
}

export interface PrivatePage {
    slug: string
    seo: Seo
    hero: PrivateHero
    anchors: PrivateAnchor[]
    partners: PrivatePartner[]
}

export interface PrivateHero {
    title: string
    description: string
    cta: HeroCta[]
    image: {
        alt: string
        desktop: {
            src: string
            width: number
            height: number
        }
    }
}

export interface Products {
    title: string
    items: HomeProduct[]
}

/** Действие CTA из конструктора баннера. */
export type HeroCtaAction = 'none' | 'link' | 'blank' | 'modal' | 'scroll'

export interface HeroCta {
    label: string
    /** Устаревший стиль из CMS. Если нет color/variant, HeroBanner читает primary, secondary, white, dark, error и text. */
    className?: string
    color?: 'primary' | 'secondary' | 'white' | 'dark' | 'error'
    variant?: 'contained' | 'text' | 'outline' | 'glass'
    action?: HeroCtaAction
    /** URL для link/blank/modal или CSS-селектор / #id для scroll. */
    href?: string
}

export interface HeroInformCard {
    title: string
    text: string
}

export interface ImageSource {
    src: string
    width: number
    height: number
}

export interface HeroImage {
    alt: string
    desktop: ImageSource
    mobile?: ImageSource
}

export interface HeroItem {
    mark?: string
    /** HTML-разметка (допускаются span.accented и т.п.). */
    title: string
    /** HTML-разметка описания. */
    description?: string
    features?: string[]
    /** До двух CTA-кнопок. */
    ctas?: HeroCta[]
    /** Один hex или пара [from, to] для градиента. */
    background?: string | [string, string]
    markColor?: string
    textColor?: string
    titleColor?: string
    image: HeroImage
    inform?: HeroInformCard[]
}

export interface HomeProduct {
    title: string
    href: string
    description?: string
    linkLabel: string
    imageAlt: string
    imageWidth: number
    imageHeight: number
    imageUrl: string
}

export interface Navigation {
    audience: AudienceItem[]
    topLinks: MenuItem[]
    topSideLinks: HeaderButton[]
    mainMenu: MainMenuItem[]
}

export interface HeaderButton {
    color: 'primary' | 'secondary' | 'white' | undefined
    label: string
    href: string
    mobileHref?: string
}

export interface AudienceItem {
    id: string
    label: string
    href: string
}

export interface FooterPhone {
    label: string
    href: string
    caption?: string
}

export interface FooterStoreLink {
    id: 'appstore' | 'appgallery' | 'rustore' | 'googleplay'
    label: string
    href: string
}

export interface FooterSocialLink {
    id: 'vk' | 'telegram'
    label: string
    href: string
}

export interface FooterNavGroup {
    title: string
    columns: MenuItem[][]
}

export interface FooterContent {
    phones: FooterPhone[]
    app: {
        title: string
        mobileTitle: string
        qrImage: string
        qrAlt: string
        stores: FooterStoreLink[]
    }
    contacts: MenuItem[]
    additional: MenuItem[]
    social: FooterSocialLink[]
    feedback: MenuItem
    onlineCall: {
        label: string
    }
    bio: {
        label: string
        href: string
        alt: string
    }
    accessibility: {
        label: string
        offLabel: string
        onLabel: string
    }
    nav: {
        primary: FooterNavGroup[]
        secondary: FooterNavGroup[]
    }
    city: {
        current: string
        searchPlaceholder: string
        items: string[]
    }
    copyright: string
}

export interface MenuItem {
    label: string
    href: string
    mark?: string
}

export interface MainMenuItem {
    label: string
    href?: string
    dropdown?: MainMenuDropdown
}

export interface MainMenuDropdown {
    columns: MenuItem[][]
    aside?: MainMenuAside
}

export interface MainMenuAside {
    title: string
    links: MenuItem[]
}

export interface SearchPage {
    slug: string
    seo: Seo
    heading: string
    submitLabel: string
    empty: string
    loadMore: string
    countPrefix: string
    variants: {
        one: string
        few: string
        many: string
    }
    prevPageLabel: string
    nextPageLabel: string
}

export interface SearchHit {
    title: string
    category: string
    href: string
}

export interface NotFoundPage {
    slug: string
    seo: Seo
    code: string
    heading: string
    text: string
    cta: {
        label: string
        href: string
    }
}

export interface ServicePackagesPage {
    slug: string
    seo: Seo
    breadcrumbs: BreadcrumbItem[]
    hero: {
        items: HeroItem[]
    }
    tabs: TabItem[]
    tabContent: Record<string, { blocks: TabBlock[] }>
    cards: {
        items: ServicePackagesCard[]
    }
}

export interface ServicePackagesCard {
    type: string
    title: string
    description: string
    features: ServicePackagesCardFeatures[]
    cta: Button[]
}

export interface Button {
    href: string
    label: string
    classList: string
}

export interface ServicePackagesCardFeatures {
    value: string
    description: string
}

export interface TabItem {
    id: string
    label: string
}

export interface AdvantagesBlock {
    type: 'advantages'
    title: string
    featured: Array<{
        title: string
        description: string
        imageUrl: string
        imageAlt: string
    }>
    items: Array<{
        title: string
        description: string
    }>
}
export interface ComboBannerBlock {
    type: 'comboBanner'
    title: string
    description: string
    href: string
    linkLabel: string
    imageUrl: string
    imageAlt: string
}
export type TabBlock = AdvantagesBlock | ComboBannerBlock

export type BreadcrumbItem = {
    label: string
    href?: string
}

export type DepoRateMapItem = {
    period: string
    rate: number
}
/** Вариант rate у «Ключевой»: ставка по дню. */
export type DepoRateByDayItem = {
    day: string
    rate: number
}

/**
 * Режимы капитализации из банковского калькулятора (calcDohod / main.js).
 * Пустая строка — без капитализации (проценты «в конце» одним куском).
 */
export type DepoCapitalizationMode = 'LWD' | 'LWDF' | 'ED' | 'BFRP' | ''

export type DepoProduct = {
    title: string
    rate: number | DepoRateByDayItem[]
    rateMap?: DepoRateMapItem[]
    symbol: string
    summa: number
    min: number
    max: number
    step: number
    period: number
    periodInDays: number
    capitalization: DepoCapitalizationMode | string
    capPeriod: number
}
/** currency code → product id → настройки */
export type DepositsConfig = Record<string, Record<string, DepoProduct>>

/** Пара курсов: банк покупает / продаёт (с точки зрения клиента на проде: Купить / Продать). */
export type ExchangeRatePair = {
    buy: number
    sell: number
}

export type ExchangeOfficeRates = {
    code: string
    label: string
    cityId: string
    cityName: string
    /** Код валюты → buy/sell. Пусто, если для офиса нет данных в снимке. */
    rates: Record<string, ExchangeRatePair>
}

/** Снимок курсов из common/rates.json (не live API). */
export type RatesConfig = {
    meta: {
        source: string
        city: string
        capturedAt?: string
        disclaimer?: string
        note?: string
    }
    updated: {
        online: string
        office: string
        cards: string
    }
    defaultOfficeCode: string
    online: Record<string, ExchangeRatePair>
    cards: Record<string, ExchangeRatePair>
    offices: ExchangeOfficeRates[]
}