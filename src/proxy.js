import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/add-car", "/my-added-cars", "/my-bookings"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (authRoutes.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
  if (protectedRoutes.includes(pathname)) {
    if (session) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/explore-cars/")) {
    if (session) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: [
    "/login",
    "/register",
    "/add-car",
    "/explore-cars/:path*",
    "/my-added-cars",
    "/my-bookings",
  ],
};
