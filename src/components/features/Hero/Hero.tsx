import { HeroItem } from '@/lib/content/types'
import HeroSlider from '@/components/features/Hero/HeroSlider'
import HeroBanner from '@/components/features/Hero/HeroBanner'
import HeroInform from '@/components/features/Hero/HeroInform'

interface HeroProps {
    slides: HeroItem[]
}

export default function Hero({ slides }: HeroProps) {
    if (slides.length === 0) return null

    return (
        <div className="container container--wide">
            {slides.length > 1 ? (
                <HeroSlider slides={slides} />
            ) : (
                <>
                    <HeroBanner slide={slides[0]} />
                    <HeroInform informs={slides[0].inform} />
                </>
            )}
        </div>
    )
}
