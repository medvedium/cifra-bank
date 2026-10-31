'use client'

import { isValidElement, useContext, type ReactNode } from 'react'
import {
    Focusable,
    OverlayArrow as TooltipArrow,
    Tooltip as AriaTooltip,
    TooltipTrigger
} from 'react-aria-components/Tooltip'
import {
    DialogTrigger,
    OverlayArrow as PopoverArrow,
    Popover,
    Pressable
} from 'react-aria-components/Popover'
import { OverlayTriggerStateContext } from 'react-aria-components/Dialog'
import { CloseIcon } from '@/components/ui/Icons'
import styles from './Tooltip.module.scss'

type Placement = 'top' | 'bottom' | 'left' | 'right'
type TooltipTriggerMode = 'hover' | 'click'

interface TooltipProps {
    /** Текст или разметка внутри подсказки. */
    content: ReactNode
    /** Триггер: кнопка/элемент или текст — тогда обернём в кнопку. */
    children: ReactNode
    /** `hover` — наведение и Tab-фокус; `click` — по клику (Popover). */
    trigger?: TooltipTriggerMode
    placement?: Placement
    /** Задержка появления для hover, мс. */
    delay?: number
    /** Задержка скрытия для hover, мс. */
    closeDelay?: number
    /** aria-label для авто-кнопки, если children — не элемент. */
    ariaLabel?: string
    className?: string
}

function bubbleClassName(
    className: string | undefined,
    isEntering: boolean,
    isExiting: boolean,
    extra?: string
) {
    return [styles.tooltip, extra, className, isEntering ? styles.entering : '', isExiting ? styles.exiting : '']
        .filter(Boolean)
        .join(' ')
}

function Arrow() {
    return (
        <svg
            width={10}
            height={5}
            viewBox="0 0 10 5"
            aria-hidden
        >
            <path d="M0 0 L5 5 L10 0" />
        </svg>
    )
}

function ClickTooltipClose() {
    const state = useContext(OverlayTriggerStateContext)

    return (
        <button
            type="button"
            className={styles.close}
            aria-label="Закрыть"
            onClick={() => state?.close()}
        >
            <CloseIcon className={styles.closeIcon} />
        </button>
    )
}

export default function Tooltip({
    content,
    children,
    trigger = 'hover',
    placement = 'top',
    delay = 300,
    closeDelay = 200,
    ariaLabel = 'Подсказка',
    className
}: TooltipProps) {
    const triggerElement = isValidElement(children) ? (
        children
    ) : (
        <button
            type="button"
            className={`${styles.trigger}${trigger === 'click' ? ` ${styles.triggerClick}` : ''}`}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )

    if (trigger === 'click') {
        return (
            <DialogTrigger>
                <Pressable>{triggerElement}</Pressable>
                <Popover
                    placement={placement}
                    offset={8}
                    className={({ isEntering, isExiting }) =>
                        bubbleClassName(className, isEntering, isExiting, styles.tooltipClick)
                    }
                >
                    <PopoverArrow className={styles.arrow}>
                        <Arrow />
                    </PopoverArrow>
                    <div className={styles.content}>{content}</div>
                    <ClickTooltipClose />
                </Popover>
            </DialogTrigger>
        )
    }

    return (
        <TooltipTrigger
            delay={delay}
            closeDelay={closeDelay}
        >
            <Focusable>{triggerElement}</Focusable>
            <AriaTooltip
                placement={placement}
                offset={8}
                className={({ isEntering, isExiting }) =>
                    bubbleClassName(className, isEntering, isExiting)
                }
            >
                <TooltipArrow className={styles.arrow}>
                    <Arrow />
                </TooltipArrow>
                <div className={styles.content}>{content}</div>
            </AriaTooltip>
        </TooltipTrigger>
    )
}
