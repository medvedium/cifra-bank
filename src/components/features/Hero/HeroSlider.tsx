'use client'

import HeroBanner from '@/components/features/Hero/HeroBanner'
import { HeroItem } from '@/lib/content/types'
import HeroInform from '@/components/features/Hero/HeroInform'

interface HeroSliderProps {
    slides: HeroItem[]
}

export default function HeroSlider ({slides}: HeroSliderProps) {
    return (
        <>
            <HeroBanner slide={slides[0]} />
            <HeroInform informs={slides[0].inform} />
        </>
    )
}