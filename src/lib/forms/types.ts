export type FormStepId = 'fields' | 'sms' | 'result'

export type FormId = string

export type FormApiStatus = 'ok' | 'error'

export type FormApiResponse = {
    status: FormApiStatus
    error?: string
}

export type SendSmsPayload = {
    phone: string
}

export type CheckSmsPayload = {
    phone: string
    sms: string
}

export type SubmitFormPayload = {
    formId: FormId
    fields: Record<string, FormDataEntryValue>
}

export type FormClient = {
    sendSms: (payload: SendSmsPayload) => Promise<FormApiResponse>
    checkSms: (payload: CheckSmsPayload) => Promise<FormApiResponse>
    submit: (payload: SubmitFormPayload) => Promise<FormApiResponse>
}