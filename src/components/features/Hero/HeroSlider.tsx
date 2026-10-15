'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, A11y, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/a11y'
import 'swiper/css/effect-fade'
import HeroBanner from '@/components/features/Hero/HeroBanner'
import HeroInform from '@/components/features/Hero/HeroInform'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons'
import { HeroItem } from '@/lib/content/types'
import styles from './HeroSlider.module.scss'

const AUTOPLAY_DELAY_MS = 5000
const SLIDE_SPEED_MS = 1000

interface HeroSliderProps {
    slides: HeroItem[]
}

export default function HeroSlider({ slides }: HeroSliderProps) {
    const bannerSwiperRef = useRef<SwiperType | null>(null)
    const informSwiperRef = useRef<SwiperType | null>(null)
    const swiperWrapperRef = useRef<HTMLDivElement | null>(null)
    const remainingMsRef = useRef(AUTOPLAY_DELAY_MS)
    const restoreDelayOnSlideChangeRef = useRef(false)

    const [isInView, setIsInView] = useState(true)
    const [bulletProgress, setBulletProgress] = useState(0)

    const syncInformToIndex = (realIndex: number) => {
        const informSwiper = informSwiperRef.current
        if (!informSwiper || informSwiper.destroyed) return
        if (informSwiper.activeIndex === realIndex) return
        informSwiper.slideTo(realIndex)
    }

    const setAutoplayDelay = (delay: number) => {
        const swiper = bannerSwiperRef.current
        if (!swiper?.params.autoplay || typeof swiper.params.autoplay === 'boolean') return
        swiper.params.autoplay.delay = delay
    }

    const pauseAutoplayOutsideView = () => {
        const autoplay = bannerSwiperRef.current?.autoplay
        if (!autoplay?.running) return
        remainingMsRef.current = Math.max(autoplay.timeLeft || remainingMsRef.current, 0)
        autoplay.stop()
    }

    const resumeAutoplayInView = () => {
        const swiper = bannerSwiperRef.current
        const autoplay = swiper?.autoplay
        if (!swiper || !autoplay) return

        // Сбрасываем «залипший» pause после fade-переходов Swiper.
        if (autoplay.running) {
            autoplay.stop()
        }

        const remaining = Math.max(Math.round(remainingMsRef.current), 0)
        if (remaining < 50) {
            setAutoplayDelay(AUTOPLAY_DELAY_MS)
            restoreDelayOnSlideChangeRef.current = false
            autoplay.start()
            return
        }

        setAutoplayDelay(remaining)
        restoreDelayOnSlideChangeRef.current = true
        autoplay.start()
    }

    useEffect(() => {
        const node = swiperWrapperRef.current
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                const autoplay = bannerSwiperRef.current?.autoplay
                setIsInView(entry.isIntersecting)

                if (entry.isIntersecting) {
                    // running но paused (типично после fade) — тоже нужно перезапустить.
                    if (!autoplay?.running || autoplay.paused) {
                        resumeAutoplayInView()
                    }
                } else if (autoplay?.running) {
                    pauseAutoplayOutsideView()
                }
            },
            { threshold: 0.2 }
        )
        observer.observe(node)

        return () => {
            observer.disconnect()
        }
    }, [resumeAutoplayInView])

    return (
        <>
            <div
                className={`${styles.swiperWrap}${isInView ? ` ${styles.inView}` : ''}`}
                style={
                    {
                        ['--bullet-progress']: String(bulletProgress)
                    } as CSSProperties
                }
                ref={swiperWrapperRef}
            >
                <Swiper
                    modules={[Autoplay, Pagination, A11y, EffectFade]}
                    slidesPerView={1}
                    autoplay={{
                        delay: AUTOPLAY_DELAY_MS,
                        disableOnInteraction: false,
                        // иначе после fade autoplay может остаться paused навсегда
                        waitForTransition: false
                    }}
                    onSwiper={(swiper) => {
                        bannerSwiperRef.current = swiper
                    }}
                    onAutoplayTimeLeft={(_swiper, timeLeft) => {
                        remainingMsRef.current = timeLeft
                        const progress = 1 - timeLeft / AUTOPLAY_DELAY_MS
                        setBulletProgress(Math.min(1, Math.max(0, progress)))
                    }}
                    pagination={{ clickable: true }}
                    onSlideChange={(swiper) => {
                        if (restoreDelayOnSlideChangeRef.current) {
                            setAutoplayDelay(AUTOPLAY_DELAY_MS)
                            restoreDelayOnSlideChangeRef.current = false
                        }
                        remainingMsRef.current = AUTOPLAY_DELAY_MS
                        setBulletProgress(0)
                        syncInformToIndex(swiper.realIndex)
                    }}
                    loop={true}
                    className={styles.swiper}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    speed={SLIDE_SPEED_MS}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide
                            key={index}
                            className={styles.swiperSlide}
                        >
                            <HeroBanner slide={slide} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    type="button"
                    className={styles.prev}
                    aria-label="Предыдущий слайд"
                    onClick={() => bannerSwiperRef.current?.slidePrev()}
                >
                    <ChevronLeftIcon />
                </button>
                <button
                    type="button"
                    className={styles.next}
                    aria-label="Следующий слайд"
                    onClick={() => bannerSwiperRef.current?.slideNext()}
                >
                    <ChevronRightIcon />
                </button>
            </div>

            <Swiper
                modules={[EffectFade]}
                slidesPerView={1}
                allowTouchMove={false}
                autoHeight
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={SLIDE_SPEED_MS}
                className={styles.informSwiper}
                onSwiper={(swiper) => {
                    informSwiperRef.current = swiper
                    const bannerIndex = bannerSwiperRef.current?.realIndex ?? 0
                    syncInformToIndex(bannerIndex)
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <HeroInform informs={slide.inform} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
