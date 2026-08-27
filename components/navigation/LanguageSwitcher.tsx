"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";

// Endonyms — always shown in their own language, regardless of current locale.
const localeLabels: Record<(typeof routing.locales)[number], string> = {
  en: "English",
  fr: "Français",
  he: "עברית",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav aria-label="Language" className="flex items-center gap-4 text-sm">
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            aria-current={active ? "true" : undefined}
            disabled={active}
            onClick={() => router.replace(pathname, { locale: l })}
            className={`focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
              active
                ? "text-foreground underline underline-offset-4"
                : "text-muted transition-colors hover:text-foreground"
            }`}
          >
            {localeLabels[l]}
          </button>
        );
      })}
    </nav>
  );
}
