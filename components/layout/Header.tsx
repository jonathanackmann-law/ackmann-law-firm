"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { navItems } from "@/lib/nav-items";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        {/* SPEC.md Section 23/5: "JA monogram micro-animation", used sparingly. */}
        <motion.span
          className="inline-block"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href="/"
            aria-label="ACKMANN LAW FIRM"
            className={`font-[family-name:var(--font-display)] text-lg tracking-wide ${focusRing}`}
          >
            JA
          </Link>
        </motion.span>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`border-b-2 pb-1 text-sm transition-colors ${focusRing} ${
                  isActive
                    ? "border-accent text-foreground"
                    : "border-transparent text-foreground/80 hover:text-foreground"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
          <LanguageSwitcher />
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={t("openMenu")}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(true)}
          className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden ${focusRing}`}
        >
          <span aria-hidden="true" className="h-px w-5 bg-foreground" />
          <span aria-hidden="true" className="h-px w-5 bg-foreground" />
        </button>
      </Container>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        triggerRef={menuButtonRef}
      />
    </header>
  );
}
