'use client'

import { useState } from 'react'
import Switch from '@/components/ui/Switch'
import ChipRadio from '@/components/ui/ChipRadio'
import Toggle from '@/components/ui/Toggle'
import Field from '@/components/ui/Field'
import SelectElement from '@/components/ui/Select'
import RangeField from '@/components/features/RangeField'
import { formatAmount, type AmountCurrency } from '@/lib/helpers/amountFormat'
import Tooltip from '@/components/ui/Tooltip'

const switchOptions = [
    { value: 'rub', label: 'Рубли' },
    { value: 'usd', label: 'Доллары' },
    { value: 'eur', label: 'Евро' },
    { value: 'cny', label: 'Юани' }
]

const chipRadioOptions = [
    { value: '91', label: '91 день' },
    { value: '180', label: '180 дней' },
    { value: '395', label: '395 дней' },
    { value: '730', label: '730 дней' },
    { value: '1095', label: '1095 дней' }
]
const chipRadioWrapOptions = [
    { value: '91', label: '91 день' },
    { value: '180', label: '180 дней' },
    { value: '395', label: '395 дней' },
    { value: '730', label: '730 дней' },
    { value: '1095', label: '1095 дней' }
]

const selectOptions = [
    { value: 'msk', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'ekb', label: 'Екатеринбург' }
]

const rangeMarks = [
    { value: 91, label: '91 день' },
    { value: 180, label: '180 дней' },
    { value: 395, label: '395 дней' },
    { value: 730, label: '730 дней' },
    { value: 1095, label: '1095 дней' }
]

export default function UiPage() {
    const [currency, setCurrency] = useState<AmountCurrency>('rub')
    const [chipRadioValue, setChipRadioValue] = useState('91')
    const [chipRadioWrapValue, setChipRadioWrapValue] = useState('91')
    const [toggleValue1, setToggleValue1] = useState(true)
    const [toggleValue2, setToggleValue2] = useState(false)
    const [fieldValue, setFieldValue] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [isSelectDisabled, setIsSelectDisabled] = useState(false)
    const [rangeSumValue, setRangeSumValue] = useState(100000)
    const [rangePeriodValue, setRangePeriodValue] = useState(91)

    return (
        <div className="container">
            <section className="section">
                <h2 className="section__title">Переключатель Switch</h2>
                <p style={{ marginBottom: 24 }}>Значение для передачи: {currency}</p>
                <Switch
                    options={switchOptions}
                    value={currency}
                    onChange={(next) => setCurrency(next as AmountCurrency)}
                    ariaLabel="Выберите валюту"
                />
            </section>

            <section className="section">
                <h2 className="section__title">Переключатель ChipRadio</h2>
                <p style={{ marginBottom: 24 }}>Значение для передачи: {chipRadioValue}</p>
                <ChipRadio
                    options={chipRadioOptions}
                    value={chipRadioValue}
                    onChange={setChipRadioValue}
                    ariaLabel="Выберите срок"
                />
            </section>

            <section className="section">
                <h2 className="section__title">Переключатель ChipRadio с переносом</h2>
                <p style={{ marginBottom: 24 }}>Значение для передачи: {chipRadioWrapValue}</p>
                <div style={{ border: '1px solid #ccc', padding: '24px', maxWidth: '400px' }}>
                    <ChipRadio
                        options={chipRadioWrapOptions}
                        value={chipRadioWrapValue}
                        onChange={setChipRadioWrapValue}
                        ariaLabel="Выберите срок"
                        isWrap={true}
                    />
                </div>
            </section>

            <section className="section">
                <h2 className="section__title">Переключатель Toggle</h2>
                <p style={{ marginBottom: 24 }}>Значение для передачи 1: {toggleValue1 ? 'checked' : 'unchecked'}</p>
                <p style={{ marginBottom: 24 }}>Значение для передачи 2: {toggleValue2 ? 'checked' : 'unchecked'}</p>
                <Toggle
                    label="Оставлять проценты на счёте (с капитализацией)"
                    extra="+0,23%"
                    checked={toggleValue1}
                    onChange={setToggleValue1}
                />
                <Toggle
                    label="Переключатель"
                    checked={toggleValue2}
                    onChange={setToggleValue2}
                />
            </section>

            <section className="section">
                <h2 className="section__title">Поле ввода</h2>
                <p style={{ marginBottom: 24 }}>Поле ввода для текста передаёт: {fieldValue}</p>
                <p style={{ marginBottom: 24 }}>
                    <label htmlFor="disableToggle">
                        <input
                            type="checkbox"
                            id="disableToggle"
                            onChange={() => setIsDisabled(!isDisabled)}
                        />
                        <span>Отключить поле ввода</span>
                    </label>
                </p>
                <div style={{ background: 'var(--background-secondary)', borderRadius: 16, padding: 24 }}>
                    <Field
                        label="Поле ввода"
                        value={fieldValue}
                        onChange={setFieldValue}
                        isDisabled={isDisabled}
                        name={'fieldName'}
                    />
                </div>
            </section>

            <section className="section">
                <h2 className="section__title">Выпадающий список</h2>
                <p style={{ marginBottom: 24 }}>
                    Выпадающий список передаёт: {selectValue ? String(selectValue) : 'Пока ничего'}
                </p>
                <p style={{ marginBottom: 24 }}>
                    <label htmlFor="disableSelect">
                        <input
                            type="checkbox"
                            id="disableSelect"
                            onChange={() => setIsSelectDisabled(!isSelectDisabled)}
                        />
                        <span>Отключить поле ввода</span>
                    </label>
                </p>
                <div style={{ background: 'var(--background-secondary)', borderRadius: 16, padding: 24 }}>
                    <SelectElement
                        label="Выберите город"
                        value={selectValue}
                        onChange={setSelectValue}
                        isDisabled={isSelectDisabled}
                        name={'selectName'}
                        options={selectOptions}
                        isSearchable={true}
                        searchLabel="Название города"
                    />
                </div>
            </section>

            <section className="section">
                <h2 className="section__title">Подсказка Tooltip</h2>
                <p style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    Hover / фокус
                    <Tooltip
                        content={
                            <>
                                Проценты ежемесячно добавляются к сумме вклада.
                                <br />
                                Так доходность оказывается <strong>выше</strong> ставки.
                            </>
                        }
                    >
                        ?
                    </Tooltip>
                </p>
                <p style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                    По клику
                    <Tooltip
                        trigger="click"
                        placement="bottom"
                        content={
                            <>
                                <p>
                                    Условия зависят от <strong>валюты</strong>, срока и статуса
                                    клиента.
                                </p>
                                <p>Подробности — в договоре по вкладу.</p>
                            </>
                        }
                    >
                        ?
                    </Tooltip>
                </p>
            </section>

            <section className="section">
                <h2 className="section__title">Поле с ползунком</h2>
                <p style={{ marginBottom: 24 }}>Сумма передаёт: {rangeSumValue}</p>
                <p style={{ marginBottom: 24 }}>Срок передаёт: {rangePeriodValue}</p>
                <div style={{ background: 'var(--background-secondary)', borderRadius: 16, padding: 24 }}>
                    <div style={{ marginBottom: 24 }}>
                        <RangeField
                            label="Срок"
                            value={rangePeriodValue}
                            name="period"
                            onChange={setRangePeriodValue}
                            marks={rangeMarks}
                            ariaLabel="Срок"
                        />
                    </div>
                    <div>
                        <RangeField
                            label="Сумма"
                            value={rangeSumValue}
                            name="sum"
                            onChange={setRangeSumValue}
                            min={10000}
                            max={500000}
                            step={1000}
                            currency={currency}
                            minLabel={formatAmount(10000, currency)}
                            maxLabel={formatAmount(500000, currency)}
                            ariaLabel="Сумма"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
