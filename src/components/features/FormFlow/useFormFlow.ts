'use client'

import { useState } from 'react'
import { formClient } from '@/lib/forms/client'
import { smsSchema } from '@/lib/forms/schemas/sms'
import type { FormClient, FormId, FormStepId } from '@/lib/forms/types'

export type FormFlowResult = 'success' | 'error' | null

type UseFormFlowOptions = {
    formId: FormId
    client?: FormClient
    phoneField?: string
}

function readPhone(fields: Record<string, FormDataEntryValue>, phoneField: string) {
    return String(fields[phoneField] ?? '')
}

export function useFormFlow({
    formId,
    client = formClient,
    phoneField = 'tel'
}: UseFormFlowOptions) {
    const [step, setStep] = useState<FormStepId>('fields')
    const [fields, setFields] = useState<Record<string, FormDataEntryValue>>({})
    const [sms, setSms] = useState('')
    const [smsError, setSmsError] = useState<string | null>(null)
    const [flowError, setFlowError] = useState<string | null>(null)
    const [result, setResult] = useState<FormFlowResult>(null)
    const [isPending, setIsPending] = useState(false)

    async function submitFields(nextFields: Record<string, FormDataEntryValue>) {
        setIsPending(true)
        setFlowError(null)

        try {
            const phone = readPhone(nextFields, phoneField)
            const res = await client.sendSms({ phone })

            if (res.status !== 'ok') {
                setFlowError(res.error ?? 'Не удалось отправить код')
                return
            }

            setFields(nextFields)
            setSms('')
            setSmsError(null)
            setStep('sms')
        } finally {
            setIsPending(false)
        }
    }

    async function confirmSms() {
        setIsPending(true)
        setSmsError(null)

        try {
            const parsed = smsSchema.safeParse({ sms })
            if (!parsed.success) {
                setSmsError(parsed.error.issues[0]?.message ?? 'Введите 6 цифр кода')
                return
            }

            const phone = readPhone(fields, phoneField)
            const check = await client.checkSms({ phone, sms: parsed.data.sms })

            if (check.status !== 'ok') {
                setSmsError(check.error ?? 'Неверный код')
                return
            }

            const submit = await client.submit({ formId, fields })

            if (submit.status !== 'ok') {
                setResult('error')
                setFlowError(submit.error ?? 'Что-то пошло не так при отправке')
                setStep('result')
                return
            }

            setResult('success')
            setFlowError(null)
            setStep('result')
        } finally {
            setIsPending(false)
        }
    }

    function reset() {
        setStep('fields')
        setFields({})
        setSms('')
        setSmsError(null)
        setFlowError(null)
        setResult(null)
        setIsPending(false)
    }

    return {
        step,
        fields,
        phoneField,
        sms,
        setSms,
        smsError,
        flowError,
        result,
        isPending,
        submitFields,
        confirmSms,
        reset
    }
}

export type FormFlowApi = ReturnType<typeof useFormFlow>
