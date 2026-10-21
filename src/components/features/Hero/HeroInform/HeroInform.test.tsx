import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroInform from './HeroInform'

describe('HeroInform', () => {
    it('Не рендерится при пустом массиве', () => {
        render(<HeroInform informs={[]} />)
        expect(screen.queryByText(/HeroInform/i)).toBeNull()
    })

    it('Рендерится при непустом массиве', () => {
        render(<HeroInform informs={[{ title: "HeroInformTitle", text: 'inform' }]} />)
        expect(screen.queryByText(/HeroInformTitle/i)).toBeInTheDocument()
    })
})