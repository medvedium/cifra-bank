'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { HeroItem } from '@/lib/content/types'
import Button from '@/components/ui/Button'
import { ArrowRightIcon } from '@/components/ui/Icons'
import styles from './Hero.module.scss'

const SLIDER_DELAY_MS = 7000
const SLIDER_SPEED_MS = 1000

interface HeroProps {
    slides: HeroItem[]
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Hero({ slides }: HeroProps) {
    const paginationId = useId()
    const introRef = useRef<HTMLDivElement>(null)
    const informRef = useRef<HTMLDivElement>(null)
    const informViewportRef = useRef<HTMLDivElement>(null)
    const informSlideRefs = useRef<Array<HTMLDivElement | null>>([])
    const [index, setIndex] = useState(0)
    const [autoplay, setAutoplay] = useState(true)

    const isSlider = slides.length > 1
    const hasInform = slides.some((slide) => (slide.inform?.length ?? 0) > 0)

    function goTo(next: number) {
        const total = slides.length
        setIndex(((next % total) + total) % total)
    }

    useLayoutEffect(() => {
        const viewport = informViewportRef.current
        if (!viewport) {
            return
        }

        const updateHeight = () => {
            const slide = informSlideRefs.current[index]
            viewport.style.height = `${slide?.scrollHeight ?? 0}px`
        }

        updateHeight()

        const observers = informSlideRefs.current
            .filter((node): node is HTMLDivElement => Boolean(node))
            .map((node) => {
                const observer = new ResizeObserver(updateHeight)
                observer.observe(node)
                return observer
            })

        return () => {
            observers.forEach((observer) => observer.disconnect())
        }
    }, [index, slides])

    useEffect(() => {
        if (!isSlider) {
            return
        }

        const intro = introRef.current
        const inform = informRef.current
        if (!intro && !inform) {
            return
        }

        let introVisible = Boolean(intro)
        let informVisible = Boolean(inform)

        const syncAutoplay = () => {
            setAutoplay(introVisible || informVisible)
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.target === intro) {
                        introVisible = entry.isIntersecting
                    }

                    if (entry.target === inform) {
                        informVisible = entry.isIntersecting
                    }
                }

                syncAutoplay()
            },
            { rootMargin: '0px', threshold: 0 }
        )

        if (intro) {
            observer.observe(intro)
        }

        if (inform) {
            observer.observe(inform)
        }

        return () => observer.disconnect()
    }, [hasInform, isSlider])

    useEffect(() => {
        if (!isSlider || !autoplay || prefersReducedMotion()) {
            return
        }

        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % slides.length)
        }, SLIDER_DELAY_MS)

        return () => window.clearInterval(timer)
    }, [autoplay, index, isSlider, slides.length])

    if (slides.length === 0) {
        return null
    }

    return (
        <section className={`${styles.hero} section`}>
            <div className="container container--wide">
                <div className={styles.intro} ref={introRef}>
                    <div className={styles.viewport}>
                        {slides.map((slide, slideIndex) => {
                            const isActive = slideIndex === index
                            const slideClassName = [
                                styles.slide,
                                isActive ? styles.slideActive : '',
                                slide.theme === 'dark' ? styles.slideDark : ''
                            ]
                                .filter(Boolean)
                                .join(' ')

                            return (
                                <div
                                    className={slideClassName}
                                    key={`${slide.title}-${slideIndex}`}
                                    aria-hidden={!isActive}
                                    style={slide.background ? { background: slide.background } : undefined}
                                >
                                    <div className={styles.content}>
                                        <div className={styles.text}>
                                            {slide.mark ? <span className={styles.mark}>{slide.mark}</span> : null}
                                            <h2 className={styles.title}>{slide.title}</h2>
                                            {slide.features?.length ? (
                                                <ul className={styles.features}>
                                                    {slide.features.map((item) => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            ) : slide.description ? (
                                                <p className={styles.description}>{slide.description}</p>
                                            ) : null}
                                        </div>
                                        {slide.cta ? (
                                            <div className={styles.action}>
                                                <Button color="primary" href={slide.cta.href || undefined}>
                                                    {slide.cta.label}
                                                </Button>
                                            </div>
                                        ) : null}
                                    </div>
                                    {slide.imageUrl ? (
                                        <div className={styles.media}>
                                            <Image
                                                className={styles.image}
                                                src={slide.imageUrl}
                                                alt={slide.imageAlt || ''}
                                                width={slide.imageWidth || 720}
                                                height={slide.imageHeight || 556}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            )
                        })}
                    </div>

                    {isSlider ? (
                        <>
                            <div className={styles.pagination} role="tablist" aria-label="Слайды баннера">
                                {slides.map((slide, slideIndex) => {
                                    const isActive = slideIndex === index
                                    return (
                                        <button
                                            type="button"
                                            role="tab"
                                            key={`${paginationId}-${slideIndex}`}
                                            className={`${styles.bullet} ${isActive ? styles.bulletActive : ''}`}
                                            aria-selected={isActive}
                                            aria-label={`Слайд ${slideIndex + 1}: ${slide.title}`}
                                            onClick={() => goTo(slideIndex)}
                                        >
                                            {isActive ? (
                                                <span
                                                    className={styles.bulletProgress}
                                                    key={`${index}-${autoplay}`}
                                                    style={{
                                                        animationDuration: `${SLIDER_DELAY_MS}ms`,
                                                        animationPlayState: autoplay ? 'running' : 'paused'
                                                    }}
                                                />
                                            ) : null}
                                        </button>
                                    )
                                })}
                            </div>
                            <button
                                type="button"
                                className={`${styles.arrow} ${styles.arrowPrev}`}
                                aria-label="Предыдущий слайд"
                                onClick={() => goTo(index - 1)}
                            >
                                <ArrowRightIcon />
                            </button>
                            <button
                                type="button"
                                className={`${styles.arrow} ${styles.arrowNext}`}
                                aria-label="Следующий слайд"
                                onClick={() => goTo(index + 1)}
                            >
                                <ArrowRightIcon />
                            </button>
                        </>
                    ) : null}
                </div>

                {hasInform ? (
                    <div className={styles.inform} ref={informRef}>
                        <h2 className="visually-hidden">Информация</h2>
                        <div
                            className={styles.informViewport}
                            ref={informViewportRef}
                            style={{ transitionDuration: `${SLIDER_SPEED_MS}ms` }}
                        >
                            {slides.map((slide, slideIndex) => (
                                <div
                                    className={`${styles.informSlide} ${slideIndex === index ? styles.informSlideActive : ''}`}
                                    key={`inform-${slide.title}-${slideIndex}`}
                                    aria-hidden={slideIndex !== index}
                                    ref={(node) => {
                                        informSlideRefs.current[slideIndex] = node
                                    }}
                                >
                                    {slide.inform?.length ? (
                                        <div className={styles.informGrid}>
                                            {slide.inform.map((card) => (
                                                <div className={styles.informItem} key={card.title}>
                                                    <strong className={styles.informTitle}>{card.title}</strong>
                                                    <p className={styles.informText}>{card.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    )
}
