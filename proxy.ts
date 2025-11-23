import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "./lib/appwrite/config";
import { SESSION_COOKIE_NAME } from "./lib/constants";
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/sign-in", "/sign-up"];
const VERIFY_EMAIL_ROUTE = "/verify-email";
export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isEmailVerifyRoute = path === VERIFY_EMAIL_ROUTE;
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  let user = null;
  let isAuthenticated = false;
  let isEmailVerified = false;

  if (sessionCookie) {
    try {
      const { account } = createSessionClient(sessionCookie as string);
      user = await account.get();
      isAuthenticated = !!user;
      isEmailVerified = user.emailVerification;
    } catch (error) {
      console.error("Error in middleware fetching user:", error);
      const response = NextResponse.next();
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }
  }

  if (isAuthenticated && isPublicRoute) {
    if (isEmailVerified) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL(VERIFY_EMAIL_ROUTE, request.url));
    }
  }

  if (isEmailVerifyRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (isEmailVerified) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (!isAuthenticated) {
      const url = new URL("/sign-in", request.url);
      url.searchParams.set("redirectTo", path);
      return NextResponse.redirect(url);
    }
    if (!isEmailVerified) {
      return NextResponse.redirect(new URL(VERIFY_EMAIL_ROUTE, request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)"],
};
