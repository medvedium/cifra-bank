import styles from './CardLink.module.scss'
import Image from 'next/image'
import { HomeProduct } from '@/lib/content/types'
import Link from 'next/link'
import { ArrowRightIcon } from '@/components/ui/Icons'

export interface CardLinkProps {
    item: HomeProduct
    className?: string
}

export default function CardLink({ item, className }: CardLinkProps) {
    return (
        <Link
            href={item.href}
            className={`${styles.cardLink} ${className ?? ''}`.trim()}
        >
            <div className={styles.cardLink__content}>
                <h3 className={styles.cardLink__title}>{item.title}</h3>

                {item.description && (
                    <div
                        className={styles.cardLink__description}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                )}

                <span className={styles.cardLink__linkLabel}>
                    {item.linkLabel}
                    <ArrowRightIcon />
                </span>
            </div>
            <Image
                className={styles.cardLink__image}
                src={item.imageUrl}
                alt={item.imageAlt}
                width={item.imageWidth}
                height={item.imageHeight}
            />
        </Link>
    )
}
