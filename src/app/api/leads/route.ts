/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest } from "next/server";
import { db } from "@/server/db";
import { createLeadSchema } from "@/features/leads/dtos/leadDto";
import { handleApiError } from "../_utils/errorHandler";

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        energyConsumptionData: {
          select: {
            monthlyBill: true,
            city: true,
            state: true,
            supplyType: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsedData = createLeadSchema.parse(body)

    const lead = await db.lead.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone,
        cpf: parsedData.cpf,
        energyConsumptionData: {
          create: parsedData.energyConsumptionData
        }
      },
      include: {
        energyConsumptionData: true
      }
    })

    return Response.json({ success: true, data: lead }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
