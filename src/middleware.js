import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT_URL,
  publicRoutes,
} from "./route";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // const { nextUrl } = req;
  // const isLoggedIn = !!req.auth;
  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  // const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // if (isApiAuthRoute) {
  //   return null;
  // }
  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return NextResponse.redirect(
  //       new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl)
  //     );
  //   }
  //   return null;
  // }
  // if (!isLoggedIn && !isPublicRoute) {
  //   let callbackUrl = nextUrl.pathname;
  //   if (nextUrl.search) {
  //     callbackUrl += nextUrl.search;
  //   }
  //   const encodedCallbackUrl = encodeURIComponent(callbackUrl);
  //   return NextResponse.redirect(
  //     new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
  //   );
  // }
  // return null;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
// export default auth((req) => {});
