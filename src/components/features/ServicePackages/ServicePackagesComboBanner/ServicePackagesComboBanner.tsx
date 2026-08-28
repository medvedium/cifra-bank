import styles from './ServicePackagesComboBanner.module.scss';
import { ComboBannerBlock } from '@/lib/content/types'
import Image from 'next/image'
import TextLink from '@/components/ui/TextLink'

export default function ServicePackagesComboBanner(props: ComboBannerBlock) {
    return (
        <section className={styles.root}>
            <div className={styles.content}>
                <h2 className={styles.title}>{props.title}</h2>
                <p className={styles.description}>{props.description}</p>
                <TextLink href={props.href} className={styles.link}>
                    {props.linkLabel}

                    <svg className={styles.linkIcon} xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none" aria-hidden="true">
                        <path d="M4.8 5.59994C5.06667 5.24439 5.06667 4.7555 4.8 4.39994L1.8 0.399941C1.46863 -0.0418871 .841827-.131429 .4 .199941C-.0418281 .531312-.131372 1.15811 .2 1.59994L2.75 4.99994L.2 8.39994C-.131372 8.84177-.0418277 9.46857 .4 9.79994C.841828 10.1313 1.46863 10.0418 1.8 9.59994L4.8 5.59994Z" fill="#01A642" />
                    </svg>
                </TextLink>
            </div>
            <Image src={props.imageUrl} alt={props.imageAlt} width={486} height={285} className={styles.image} />
        </section>
    )
}