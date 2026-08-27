import { defineRouting } from "next-intl/routing";
import { defaultLocale, supportedLocales } from "@/lib/config";

export const routing = defineRouting({
  locales: supportedLocales,
  defaultLocale,
  localePrefix: "always",
});
