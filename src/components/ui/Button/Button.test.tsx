import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button'

vi.mock('next/link', () => ({
    default: ({
        children,
        href,
        ...props
    }: {
        children: React.ReactNode
        href: string
        className?: string
        'aria-label'?: string
    }) => (
        <a
            href={href}
            {...props}
        >
            {children}
        </a>
    )
}))

describe('Button', () => {
    it('показывает текст', () => {
        render(<Button>Оформить</Button>)
        expect(screen.getByRole('button', { name: 'Оформить' })).toBeInTheDocument()
    })

    it('с href рендерит ссылку', () => {
        render(<Button href="/service-packages">Оформить</Button>)
        expect(screen.getByRole('link', { name: 'Оформить' })).toHaveAttribute('href', '/service-packages')
    })

    it('disabled блокирует кнопку', () => {
        render(<Button disabled>Оформить</Button>)
        expect(screen.getByRole('button', { name: 'Оформить' })).toBeDisabled()
    })

    it('loading оставляет имя и не вызывает onClick', () => {
        const onClick = vi.fn()
        render(
            <Button
                loading
                onClick={onClick}
            >
                Оформить
            </Button>
        )
        const button = screen.getByRole('button', { name: 'Оформить' })
        expect(button).toHaveAttribute('aria-busy', 'true')
        expect(button).not.toBeDisabled()
        expect(button.querySelector('svg')).toBeInTheDocument()
        button.click()
        expect(onClick).not.toHaveBeenCalled()
    })
})
