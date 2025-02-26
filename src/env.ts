import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  BASEURL_WEB_ORIGIN: z.string().default(''),
})

export const env = envSchema.parse(process.env)
