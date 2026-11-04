'use client'

import Button from '@/components/ui/Button'
import Field from '@/components/ui/Field'
import { useFormFlowContext } from './FormFlowContext'

export default function FormFlowSmsStep() {
    const { fields, phoneField, sms, setSms, smsError, isPending, confirmSms } = useFormFlowContext()
    const phone = String(fields[phoneField] ?? '')
    const digits = sms.replace(/\D/g, '')

    return (
        <div>
            <p>
                На ваш номер <strong>{phone || '—'}</strong> был отправлен код. Введите его в поле ниже.
            </p>
            <p style={{ opacity: 0.7, fontSize: 14 }}>Для демо код: 123456</p>

            <Field
                label="Код из СМС"
                name="sms"
                value={sms}
                inputMode="numeric"
                onChange={setSms}
                isDisabled={isPending}
            />
            {smsError ? <p style={{ color: 'var(--text-red)' }}>{smsError}</p> : null}

            <Button
                type="button"
                loading={isPending}
                disabled={isPending || digits.length < 6}
                onClick={confirmSms}
            >
                Подтвердить
            </Button>
        </div>
    )
}
