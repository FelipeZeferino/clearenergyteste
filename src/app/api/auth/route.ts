import { adminLoginSchema } from "@/features/admin/dtos/adminDto";
import { db } from "@/server/db";
import type { NextRequest } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const loginData: unknown = await request.json();

    const { email, password } = adminLoginSchema.parse(loginData);

    const admin = await db.admin.findUnique({
      where: { email },
      select: { id: true, email: true, password: true }
    });

    if (!admin) {
      return Response.json(
        { success: false, msg: 'This email is not registered' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return Response.json(
        { success: false, msg: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return Response.json({ success: true, token });

  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, msg: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
