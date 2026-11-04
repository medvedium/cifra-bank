import { z } from 'zod'

export const smsSchema = z.object({
    sms: z.string().length(6, 'Введите 6 цифр кода')
})

export type SmsValues = z.infer<typeof smsSchema>