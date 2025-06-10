// export const runtime = "nodejs";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { env } from "./env";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   console.log(token);

//   if (!token) {
//     return NextResponse.redirect(new URL("/admin/login", req.url));
//   }

//   try {
//     jwt.verify(token, env.JWT_SECRET as string);
//     return NextResponse.next();
//   } catch (error) {
//     console.log('catched on middleware', error);
//     return handleUnauthorized(req);
//     // return NextResponse.redirect(new URL("/admin/login", req.url));
//   }
// }

// function handleUnauthorized(req: NextRequest) {
//   const isApi = req.nextUrl.pathname.startsWith("/api");

//   if (isApi) {
//     return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
//       status: 401,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   // Para páginas normais, redireciona pro login
//   return NextResponse.redirect(new URL("/admin/login", req.url));
// }

// export const config = {
//   matcher: ["/admin/:path*", "/api/admin/:path*"],
// };