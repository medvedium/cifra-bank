import styles from "./page.module.scss";
import {getHomePage, getSiteInfo} from "@/lib/content/loader";
import {Metadata} from "next";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
    const page = await getHomePage();
    return buildPageMetadata(page.seo, page.slug)
}

export default async function Home() {
    const [site, page] = await Promise.all([
        getSiteInfo(),
        getHomePage()
    ]);

    const slides = page.hero.items

    return (
        <main className={styles.main}>
            <h1 className="visually-hidden">{site.name}</h1>
            <section className={`${styles.hero} section`}>
                <div className="container">
                    {slides?.map((item, index) => (
                        <div className={styles.heroItem} key={index}>
                            <mark className={styles.heroMark}>{item.mark}</mark>
                            <h2 className={styles.heroTitle}>{item.title}</h2>
                            <p className={styles.heroText}>{item.description}                            </p>
                            <div className={styles.heroAction}>
                                {item.cta.href ? (
                                    <a href={item.cta.href}
                                       rel="noopener noreferrer">{item.cta.label}</a>
                                ) : (
                                    <button>{item.cta.label}</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${styles.products} section`}>
                <div className="container">
                    <h2 className="section__title">{page.products.title}</h2>
                    <div className={styles.productsGrid}>
                        {page.products.items?.map((item, index) => (
                            <a href={item.href} rel="noopener noreferrer" key={index}>
                                <h3 className={styles.productsItemTitle}>
                                    {item.title}
                                </h3>
                                <span className={styles.productsItemLink}>{item.linkLabel}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
