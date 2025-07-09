import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const isAuth = !!token;

  const protectedPaths = ["/dashboard", "/create", "/settings", "/profile"];

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/create", "/settings", "/profile/:path*"],
};
