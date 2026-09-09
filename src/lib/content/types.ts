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

export interface HomePage {
    slug: string
    seo: Seo
    hero: {
        items: HeroItem[]
    }
    products: Products
}

export interface CorporateHomePage {
    slug: string
    seo: Seo
    hero: {
        items: HeroItem[]
    }
    products: Products
}

export interface Products {
    title: string
    items: HomeProduct[]
}

export interface HeroCta {
    href: string
    label: string
}

export interface HeroInformCard {
    title: string
    text: string
}

export interface HeroItem {
    mark?: string
    title: string
    description?: string
    features?: string[]
    cta: HeroCta
    theme?: 'light' | 'dark'
    background?: string
    imageHref?: string
    imageAlt?: string
    imageWidth?: number
    imageHeight?: number
    imageUrl?: string
    inform?: HeroInformCard[]
}

export interface HomeProduct {
    title: string
    href: string
    linkLabel: string
    imageHref: string
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