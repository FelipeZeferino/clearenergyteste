import { handleApiError } from "@/app/api/_utils/errorHandler";
import { DeleteLeadParamsSchema } from "@/features/leads/schemas/leadSchemas";
import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const loadedParams = await params;

    const { id } = DeleteLeadParamsSchema.parse(loadedParams);
    
    await db.lead.delete({ 
        where: { id } 
    });
    
    return NextResponse.json(
        { message: `Lead ${id} deletado com sucesso.` },
        { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}