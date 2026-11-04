import { CheckSmsPayload, FormApiResponse, FormClient, SendSmsPayload, SubmitFormPayload } from '@/lib/forms/types'
import { withMockQuery } from '@/lib/forms/mockFlags'

async function postJson(url: string, body: unknown): Promise<FormApiResponse> {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })

    const data = (await res.json().catch(() => null)) as FormApiResponse | null

    if (!data || (data.status !== 'ok' && data.status !== 'error')) {
        return { status: 'error', error: 'Что-то пошло не так. Попробуйте ещё раз' }
    }

    return data
}


export const formClient: FormClient = {
    sendSms(payload: SendSmsPayload) {
        return postJson('/api/forms/send-sms', payload)
    },

    checkSms(payload: CheckSmsPayload) {
        return postJson('/api/forms/check-sms', payload)
    },

    submit(payload: SubmitFormPayload) {
        const url = withMockQuery(`/api/forms/submit/${encodeURIComponent(payload.formId)}`)
        return postJson(url, payload.fields)
    },
}