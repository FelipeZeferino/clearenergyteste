import { db } from "@/server/db";
import { handleApiError } from "../../_utils/errorHandler";
import { NextResponse } from "next/server";

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

    return NextResponse.json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
