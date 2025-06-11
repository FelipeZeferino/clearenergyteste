import { type NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PROTECTED_PATHS = ['/admin/dashboard']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin') {
    return NextResponse.next()
  }

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path))
  if (!isProtected) return NextResponse.next()

  const token = request.cookies.get('token')?.value

  if (!token || token.trim() === '') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
