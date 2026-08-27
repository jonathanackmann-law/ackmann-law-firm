import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except static assets, API routes and Next.js internals.
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
