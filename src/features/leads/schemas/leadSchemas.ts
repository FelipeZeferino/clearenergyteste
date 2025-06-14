import { z } from "zod";
import { BrazilianStates } from "../utils/constants";

export const createLeadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  cpf: z.string().regex(/^\d{11}$/, "CPF inválido"),
  energyConsumptionData: z.object({
    monthlyBill: z.number().nonnegative(),
    city: z.string(),
    state: z.enum(BrazilianStates),
    supplyType: z.enum(["MONOFASICO", "BIFASICO", "TRIFASICO"]),
  }),
});

export const newLeadFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().nonempty("Telefone é obrigatório"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 números"),
  energyConsumptionData: z.object({
    monthlyBill: z
      .number({ invalid_type_error: "Preencha com o valor da sua conta" })
      .nonnegative("O valor da conta mensal deve ser positivo"),
    city: z.string().nonempty("Cidade é obrigatória"),
    state: z.enum(BrazilianStates, {
      errorMap: () => ({ message: "Estado inválido" }),
    }),
    supplyType: z.enum(["MONOFASICO", "BIFASICO", "TRIFASICO"], {
      errorMap: () => ({ message: "Tipo de fornecimento inválido" }),
    }),
  }),
});

export const DeleteLeadParamsSchema = z.object({
  id: z.string(),
});

export type DiscountProjection = {
  years: number;
  totalWithoutDiscount: number;
  totalWithDiscount: number;
};


export interface ApiLeadResponse {
  sucess: boolean,
  count: number,
  data: [{
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  energyConsumptionData: {
    monthlyBill: number;
    city: string;
    state: string;
    supplyType: string;
  };
  }]
}

export interface LeadData {
  id: string,
  name: string,
  city: string,
  state: string,
  monthlyBill: number
}