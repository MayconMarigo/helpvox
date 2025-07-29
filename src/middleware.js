// import { AuthenticationService } from "services/authentication";
// import { adminMiddleware } from "middleware-handlers/admin";
// import { userMiddleware } from "middleware-handlers/authenticated";

export async function middleware(request) {
  // const { pathname } = request.nextUrl;

  // if (pathname.startsWith("/authenticated/admin")) return adminMiddleware(request);

  // if (pathname.startsWith("/authenticated")) return userMiddleware(request);
}

export const config = {
  matcher: ["/authenticated/:path*", `/admin/:path*`],
};
