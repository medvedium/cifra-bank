import styles from './HeroInform.module.scss'
import { HeroInformCard } from '@/lib/content/types'

interface HeroInformProps {
    informs?: HeroInformCard[]
}

export default function HeroInform({ informs }: HeroInformProps) {
    if (!informs?.length) {
        return null
    }

    return (
        <div className={styles.informWrapper}>
            <div className={styles.informInner}>
                {informs.map((inform, index) => (
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
