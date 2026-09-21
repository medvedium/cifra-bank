import styles from './Breadcrumbs.module.scss'
import { BreadcrumbItem } from '@/lib/content/types'
import Link from 'next/link'

type BreadcrumbsProps = {
    items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const home = items.find((item) => item.href)

    if (!home?.href) {
        return null
    }

    return (
        <div className="container container--wide">
            <nav className={styles.breadcrumbs} aria-label={'Хлебные крошки'}>
                <Link
                    href={home.href}
                    className={`${styles.mobileBack} text-t2`}
                    aria-label="Назад"
                >
                    {home.label}
                </Link>

                <ol
                    itemScope
                    itemType="https://schema.org/BreadcrumbList"
                    className={styles.desktopList}
                >
                    {items.map((item: BreadcrumbItem, index: number) => (
                        <li
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                            key={`${item.label}-${index}`}
                            className={`${styles.breadcrumb} text-t2`}
                        >
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={styles.breadcrumbLink}
                                    itemProp="item"
                                >
                                    <span itemProp="name">{item.label}</span>
                                </Link>
                            ) : (
                                <span
                                    aria-current="page"
                                    className={styles.breadcrumbLabel}
                                    itemProp="name"
                                >
                                    {item.label}
                                </span>
                            )}
                            <meta
                                itemProp="position"
                                content={(index + 1).toString()}
                            />
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}
