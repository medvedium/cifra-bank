import styles from "./page.module.scss";
import {getHomePage, getSiteInfo} from "@/lib/content/loader";

export default async function Home() {
    const [site, page] = await Promise.all([
        getSiteInfo(),
        getHomePage()
    ]);

    const slide = page.hero.items[0]
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{slide?.title}</h1>
            <p className={styles.subtitle}>{site.email}</p>
        </main>
    );
}
