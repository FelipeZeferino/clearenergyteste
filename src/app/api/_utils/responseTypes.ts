import { type DiscountProjection } from "@/features/leads/schemas/leadSchemas"

export type newLeadResponse = {
    data: { data: DiscountProjection[] },
    success: boolean
}