'use client'

import { useState } from 'react'
import Switch from '@/components/ui/Switch'

const options = [
    { value: 'rub', label: 'Рубли' },
    { value: 'usd', label: 'Доллары' },
    { value: 'cny', label: 'Юани' }
]

export default function UiPage() {
    const [currency, setCurrency] = useState('rub')

    return (
        <div className="container">
            <section className="section">
                <h2 className="section__title">Переключатель Switch</h2>
                <p style={{ marginBottom: 24 }}>Значение для передачи: {currency}</p>
                <Switch
                    options={options}
                    value={currency}
                    onChange={setCurrency}
                    ariaLabel="Выберите валюту"
                />
            </section>
        </div>
    )
}
