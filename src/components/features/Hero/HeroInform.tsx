import styles from './HeroInform.module.scss'
import { HeroInformCard } from '@/lib/content/types'

interface HeroInformProps {
    informs?: HeroInformCard[]
}

export default function HeroInform({ informs }: HeroInformProps) {
    return (
        <div className={`${styles.informWrapper} ${!informs?.length ? styles.collapsed : ''}`}>
            <div className={styles.informInner}>
                {informs?.map((inform, index) => (
                    <div
                        className={styles.informItem}
                        key={`${inform.title}-${index}`}
                    >
                        <p className={styles.informTitle}>{inform.title}</p>
                        <p className={styles.informDescription}>{inform.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
