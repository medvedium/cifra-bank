import styles from './page.module.scss'
import { getCorporateHomePage, getSiteInfo } from '@/lib/content/loader'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import Hero from '@/components/features/Hero'
import CardLink from '@/components/features/CardLink'

export async function generateMetadata(): Promise<Metadata> {
    const page = await getCorporateHomePage()
    return buildPageMetadata(page.seo, page.slug)
}

export default async function Home() {
    const [site, page] = await Promise.all([getSiteInfo(), getCorporateHomePage()])

    return (
        <>
            <h1 className="visually-hidden">{site.name}</h1>

            <Hero slides={page.hero.items} />

            <section className={`${styles.products} section`}>
                <div className="container">
                    <h2 className="section__title">{page.products.title}</h2>
                    <div className={styles.productsGrid}>
                        {page.products.items?.map((item, index) => (
                            <CardLink
                                item={item}
                                key={`products-item-${index}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
