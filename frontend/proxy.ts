import { type NextRequest, NextResponse } from "next/server"

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protect admin routes (except login page)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // Check for admin session cookie/token
    const adminSession = request.cookies.get("homac_admin_active")

    // If no session indicator, redirect to login
    // Note: Full session validation happens client-side with localStorage
    // This is a basic protection layer
    if (!adminSession) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
