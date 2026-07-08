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
