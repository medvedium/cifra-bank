'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { HeroItem } from '@/lib/content/types'
import { ArrowRightIcon } from '@/components/ui/Icons'
import HeroCtas from './HeroCtas'
import HeroPicture from './HeroPicture'
import { getSlideStyle, resolveSlideTone } from './heroUtils'
import styles from './Hero.module.scss'

const SLIDER_DELAY_MS = 7000
const SLIDER_SPEED_MS = 1000
const SWIPE_THRESHOLD_PX = 40

interface HeroProps {
    slides: HeroItem[]
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function renderInformGrid(inform: NonNullable<HeroItem['inform']>) {
    return (
        <div className={styles.informGrid}>
            {inform.map((card) => (
                <div
                    className={styles.informItem}
                    key={card.title}
                >
                    <strong className={styles.informTitle}>{card.title}</strong>
                    <p className={styles.informText}>{card.text}</p>
                </div>
            ))}
        </div>
    )
}

export default function Hero({ slides }: HeroProps) {
    const paginationId = useId()
    const introRef = useRef<HTMLDivElement>(null)
    const viewportRef = useRef<HTMLDivElement>(null)
    const slideRefs = useRef<Array<HTMLDivElement | null>>([])
    const informRef = useRef<HTMLDivElement>(null)
    const informViewportRef = useRef<HTMLDivElement>(null)
    const informSlideRefs = useRef<Array<HTMLDivElement | null>>([])
    const pointerStartX = useRef<number | null>(null)
    const [index, setIndex] = useState(0)
    const [autoplay, setAutoplay] = useState(true)

    const isSlider = slides.length > 1
    const introSlides = isSlider ? slides : [slides[0]]
    const hasInform = isSlider
        ? slides.some((slide) => (slide.inform?.length ?? 0) > 0)
        : (slides[0]?.inform?.length ?? 0) > 0
    const activeTone = resolveSlideTone(slides[index] ?? slides[0])

    function goTo(next: number) {
        const total = slides.length
        setIndex(((next % total) + total) % total)
    }

    useLayoutEffect(() => {
        const viewport = viewportRef.current
        if (!viewport || !isSlider) {
            if (viewport) {
                viewport.style.height = ''
            }
            return
        }

        const updateHeight = () => {
            const minHeight = Number.parseFloat(getComputedStyle(viewport).minHeight) || 0
            let maxHeight = 0

            slideRefs.current.forEach((slide) => {
                if (!slide) {
                    return
                }

                maxHeight = Math.max(maxHeight, slide.scrollHeight)
            })

            viewport.style.height = `${Math.max(maxHeight, minHeight)}px`
        }

        updateHeight()

        const observers = slideRefs.current
            .filter((node): node is HTMLDivElement => Boolean(node))
            .map((node) => {
                const observer = new ResizeObserver(updateHeight)
                observer.observe(node)
                return observer
            })

        window.addEventListener('resize', updateHeight)

        return () => {
            observers.forEach((observer) => observer.disconnect())
            window.removeEventListener('resize', updateHeight)
        }
    }, [isSlider, slides])

    useLayoutEffect(() => {
        if (!isSlider) {
            return
        }

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
    }, [index, isSlider, slides])

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

    function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
        if (!isSlider || event.pointerType === 'mouse') {
            return
        }

        pointerStartX.current = event.clientX
    }

    function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
        if (!isSlider || pointerStartX.current === null) {
            return
        }

        const delta = event.clientX - pointerStartX.current
        pointerStartX.current = null

        if (Math.abs(delta) < SWIPE_THRESHOLD_PX) {
            return
        }

        if (delta < 0) {
            goTo(index + 1)
        } else {
            goTo(index - 1)
        }
    }

    function onPointerCancel() {
        pointerStartX.current = null
    }

    if (slides.length === 0) {
        return null
    }

    return (
        <section className={`${styles.hero} section`}>
            <div className="container container--wide">
                <div
                    className={styles.intro}
                    ref={introRef}
                    data-tone={activeTone}
                    data-slider={isSlider ? 'true' : 'false'}
                >
                    <div
                        className={styles.viewport}
                        ref={viewportRef}
                        onPointerDown={onPointerDown}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerCancel}
                    >
                        {introSlides.map((slide, slideIndex) => {
                            const isActive = isSlider ? slideIndex === index : true
                            const slideClassName = [
                                styles.slide,
                                isSlider ? (isActive ? styles.slideActive : '') : styles.slideStatic
                            ]
                                .filter(Boolean)
                                .join(' ')

                            return (
                                <div
                                    className={slideClassName}
                                    key={`${slide.mark ?? 'slide'}-${slideIndex}`}
                                    aria-hidden={isSlider ? !isActive : undefined}
                                    style={getSlideStyle(slide)}
                                    data-tone={resolveSlideTone(slide)}
                                    ref={(node) => {
                                        slideRefs.current[slideIndex] = node
                                    }}
                                >
                                    <div className={styles.content}>
                                        <div className={styles.text}>
                                            {slide.mark ? <span className={styles.mark}>{slide.mark}</span> : null}
                                            <h2
                                                className={`text-h1 ${styles.title}`}
                                                dangerouslySetInnerHTML={{ __html: slide.title }}
                                            />
                                            {slide.features?.length ? (
                                                <ul className={styles.features}>
                                                    {slide.features.map((item) => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            ) : slide.description ? (
                                                <div
                                                    className={styles.description}
                                                    dangerouslySetInnerHTML={{ __html: slide.description }}
                                                />
                                            ) : null}
                                        </div>
                                        <HeroCtas items={slide.ctas} />
                                    </div>
                                    {slide.image ? (
                                        <div className={styles.media}>
                                            <HeroPicture
                                                image={slide.image}
                                                highPriority={slideIndex === 0}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            )
                        })}
                    </div>

                    {isSlider ? (
                        <>
                            <div
                                className={styles.pagination}
                                role="tablist"
                                aria-label="Слайды баннера"
                            >
                                {slides.map((slide, slideIndex) => {
                                    const isActive = slideIndex === index
                                    return (
                                        <button
                                            type="button"
                                            role="tab"
                                            key={`${paginationId}-${slideIndex}`}
                                            className={`${styles.bullet} ${isActive ? styles.bulletActive : ''}`}
                                            aria-selected={isActive}
                                            aria-label={`Слайд ${slideIndex + 1}`}
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
                    <div
                        className={styles.inform}
                        ref={informRef}
                    >
                        <h2 className="visually-hidden">Информация</h2>
                        {isSlider ? (
                            <div
                                className={styles.informViewport}
                                ref={informViewportRef}
                                style={{ transitionDuration: `${SLIDER_SPEED_MS}ms` }}
                            >
                                {slides.map((slide, slideIndex) => (
                                    <div
                                        className={`${styles.informSlide} ${slideIndex === index ? styles.informSlideActive : ''}`}
                                        key={`inform-${slideIndex}`}
                                        aria-hidden={slideIndex !== index}
                                        ref={(node) => {
                                            informSlideRefs.current[slideIndex] = node
                                        }}
                                    >
                                        {slide.inform?.length ? renderInformGrid(slide.inform) : null}
                                    </div>
                                ))}
                            </div>
                        ) : slides[0].inform?.length ? (
                            <div className={styles.informViewportStatic}>{renderInformGrid(slides[0].inform)}</div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </section>
    )
}
