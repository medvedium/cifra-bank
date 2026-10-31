'use client'

import styles from './RangeSlider.module.scss'

interface RangeMark {
    value: number
    label: string
}

interface RangeSliderProps {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    ariaLabel?: string
    className?: string
    minLabel?: string
    maxLabel?: string
    marks?: RangeMark[]
}

function indexFromValue(marks: RangeMark[], value: number) {
    const exactIndex = marks.findIndex((mark) => mark.value === value)
    if (exactIndex >= 0) return exactIndex

    let nearestIndex = 0
    let nearestDistance = Math.abs(marks[0].value - value)

    for (let index = 1; index < marks.length; index += 1) {
        const distance = Math.abs(marks[index].value - value)
        if (distance < nearestDistance) {
            nearestDistance = distance
            nearestIndex = index
        }
    }

    return nearestIndex
}

export default function RangeSlider({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    ariaLabel,
    className,
    minLabel,
    maxLabel,
    marks
}: RangeSliderProps) {
    const marksList = marks && marks.length > 0 ? marks : null

    const sliderMin = marksList ? 0 : min
    const sliderMax = marksList ? marksList.length - 1 : max
    const sliderStep = marksList ? 1 : step
    const sliderValue = marksList
        ? indexFromValue(marksList, value)
        : Math.min(max, Math.max(min, value))

    const range = sliderMax - sliderMin
    const progress = range <= 0 ? 0 : ((sliderValue - sliderMin) / range) * 100

    const startLabel = marksList ? marksList[0].label : minLabel
    const endLabel = marksList ? marksList[marksList.length - 1].label : maxLabel

    return (
        <div
            className={`${styles.rangeSlider}${className ? ` ${className}` : ''}`}
            style={{ ['--progress' as string]: `${progress}%` }}
        >
            <input
                className={styles.input}
                type="range"
                value={sliderValue}
                min={sliderMin}
                max={sliderMax}
                step={sliderStep}
                aria-label={ariaLabel}
                onChange={(event) => {
                    const next = Number(event.target.value)

                    if (marksList) {
                        onChange(marksList[next]?.value ?? marksList[0].value)
                        return
                    }

                    onChange(next)
                }}
            />
            {(startLabel || endLabel) && (
                <div className={styles.labels}>
                    <span>{startLabel}</span>
                    <span>{endLabel}</span>
                </div>
            )}
        </div>
    )
}
