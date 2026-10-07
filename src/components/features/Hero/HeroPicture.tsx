import { getImageProps } from 'next/image'
import type { HeroImage } from '@/lib/content/types'
import styles from './Hero.module.scss'

interface HeroPictureProps {
    image: HeroImage
    highPriority?: boolean
}

const MOBILE_SIZES = 'calc(100vw - 32px)'
// Mobile asset до 767px; с планшета — desktop-композиция, на узком md кропится CSS.
const DESKTOP_SIZES = '(min-width: 1200px) 560px, 50vw'

export default function HeroPicture({ image, highPriority = false }: HeroPictureProps) {
    const commonProps = {
        alt: image.alt,
        className: styles.image,
        loading: highPriority ? ('eager' as const) : ('lazy' as const),
        fetchPriority: highPriority ? ('high' as const) : ('auto' as const)
    }

    const { props: desktopProps } = getImageProps({
        ...commonProps,
        src: image.desktop.src,
        width: image.desktop.width,
        height: image.desktop.height,
        sizes: DESKTOP_SIZES
    })

    const mobileProps = image.mobile
        ? getImageProps({
              ...commonProps,
              src: image.mobile.src,
              width: image.mobile.width,
              height: image.mobile.height,
              sizes: MOBILE_SIZES
          }).props
        : null

    return (
        <picture className={styles.picture}>
            {mobileProps ? (
                <source
                    media="(max-width: 767px)"
                    srcSet={mobileProps.srcSet}
                    sizes={mobileProps.sizes}
                />
            ) : null}
            <img
                {...desktopProps}
                alt={image.alt}
            />
        </picture>
    )
}
