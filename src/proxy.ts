import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoginRoutes = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isLoginRoutes && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isLoginRoutes && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  // middleware invoke only for these routes
  matcher: ["/profile", "/login", "/signup"],
};
