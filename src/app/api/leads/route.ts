import { type NextRequest } from "next/server";
import { db } from "@/server/db";
import { createLeadSchema } from "@/features/leads/schemas/leadSchemas";
import { handleApiError } from "../_utils/errorHandler";
import { calculateAnnualSavings } from "@/features/leads/services/discountCalculatorService";

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
            supplyType: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsedData = createLeadSchema.parse(body);

    await db.lead.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone,
        cpf: parsedData.cpf,
        energyConsumptionData: {
          create: parsedData.energyConsumptionData,
        },
      },
      include: {
        energyConsumptionData: true,
      },
    });

    const { monthlyBill } = parsedData.energyConsumptionData;
    const discountProjections = [1, 3, 5].map((years) => ({
      ...calculateAnnualSavings(years, monthlyBill),
    }));

    return Response.json(
      { success: true, data: discountProjections },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error);
  }
}
