import { z } from 'zod'
import { BrazilianStates } from '../utils/constants'

export const createLeadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  cpf: z.string().regex(/^\d{11}$/, 'CPF inválido'),
  energyConsumptionData: z.object({
    monthlyBill: z.number().nonnegative(),
    city: z.string(),
    state: z.enum(BrazilianStates),
    supplyType: z.enum(['MONOFASICO', 'BIFASICO', 'TRIFASICO']),
  }),
})
