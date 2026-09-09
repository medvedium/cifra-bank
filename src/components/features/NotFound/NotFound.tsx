import Button from '@/components/ui/Button'
import type { NotFoundPage as NotFoundPageContent } from '@/lib/content/types'
import styles from './NotFound.module.scss'

interface NotFoundProps {
    page: NotFoundPageContent
}

export default function NotFound({ page }: NotFoundProps) {
    return (
        <section className={styles.section}>
            <div className="container">
                <span className={styles.number} aria-hidden="true">
                    {page.code}
                </span>
                <h1 className={styles.title}>{page.heading}</h1>
                <p className={styles.text}>{page.text}</p>
                <div className={styles.action}>
                    <Button href={page.cta.href}>{page.cta.label}</Button>
                </div>
            </div>
        </section>
    )
}
