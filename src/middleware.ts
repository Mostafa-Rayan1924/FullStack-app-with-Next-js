import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("tokenNameInBrowser")?.value;

  if (!authToken && request.nextUrl.pathname.startsWith("/api/user/profile/")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (
    (authToken && request.nextUrl.pathname === "/login") ||
    request.nextUrl.pathname === "/register"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/user/profile/:path*", "/login", "/register"],
};
