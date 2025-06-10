import { adminLoginSchema } from "@/features/admin/dtos/adminDto";
import { db } from "@/server/db";
import type { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { handleApiError } from "../_utils/errorHandler";
import { cookies } from "next/headers";
 
export async function POST(request: NextRequest) {
  try {
    const loginData: unknown = await request.json();

    const { email, password } = adminLoginSchema.parse(loginData);

    const admin = await db.admin.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    if (!admin) {
      return Response.json(
        { success: false, msg: "Email not registered." },
        { status: 401 },
      );
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return Response.json(
        { success: false, msg: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      env.JWT_SECRET as string,
      { expiresIn: "8h" },
    );

    const cookieSetter = await cookies();

    cookieSetter.set("token", token, {
      httpOnly: true,
      path: "/admin",
      maxAge: 60 * 60 * 8,
      });

    return Response.json({ success: true, token });
  } catch (error) {
    handleApiError(error);
  }
}