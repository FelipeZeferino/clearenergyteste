import { z } from 'zod'

export const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(15, 'Password must be at most 15 characters long')
    .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one special character'
    )
})

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})