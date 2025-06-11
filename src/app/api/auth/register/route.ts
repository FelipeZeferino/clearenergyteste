import type { NextRequest } from "next/server";
import { createAdminSchema } from "@/features/admin/schemas/adminSchema";
import { db } from "@/server/db";
import { handleApiError } from "../../_utils/errorHandler";
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
    try {
        const newAdminData: unknown = await request.json()
    
        const parsedData = createAdminSchema.parse(newAdminData)

        const hashedPassword = await bcrypt.hash(parsedData.password, 12)

        await db.admin.create({ data: { ...parsedData, password: hashedPassword }})

        return Response.json({ success: true, msg: 'Created' }, { status: 201 })
    } catch (error) {
        return handleApiError(error)
    }
}