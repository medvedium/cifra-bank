export interface SiteInfo {
    name: string
    baseUrl: string
    phones: Phones
    email: string
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

export interface Products {
    title: string
    items: HomeProduct[]
}

export interface HeroCta {
    href: string
    label: string
}

export interface HeroItem {
    mark: string
    title: string
    description: string
    cta: HeroCta
    imageHref: string
    imageAlt: string
    imageWidth: number
    imageHeight: number
    imageUrl: string
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
    audienceLabel: string
    alternateAudience: {
        label: string
        href: string
    }
    topLinks: MenuItem[]
    topSideLinks: MenuItem[]
    mainMenu: MenuItem[]
    footerSections: FooterSection[]
}

export interface FooterSection {
    title: string
    links: MenuItem[]
}

export interface MenuItem {
    label: string
    href: string
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