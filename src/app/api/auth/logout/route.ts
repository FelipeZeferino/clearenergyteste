// app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // Remove o cookie do token
  cookieStore.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ ok: true });
}
