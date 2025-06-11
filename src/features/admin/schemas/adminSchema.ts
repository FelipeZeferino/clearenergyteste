import { z } from 'zod'

export const createAdminSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/,
      "Sua senha deve conter pelo menos uma letra maíuscula, uma minúscula e um caractere especial",
    ),
});

export const adminLoginSchema = z.object({
  email: z.string().email().nonempty({ message: "Digite um email válido" }),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(15, "A senha deve ter no máximo 15 caracteres"),
});
