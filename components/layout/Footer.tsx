import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { navItems } from "@/lib/nav-items";
import { siteConfig } from "@/lib/config";

const mutedLink =
  "text-sm text-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  // SPEC.md Section 10: never render a social icon when its link is empty.
  const socialEntries = Object.entries(siteConfig.socialLinks).filter(
    ([, url]) => url,
  );

  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-col gap-12 py-16 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-[family-name:var(--font-display)] text-lg">
              {siteConfig.firmName}
            </p>
            <address className="not-italic text-sm text-muted">
              {siteConfig.address.line1}, {siteConfig.address.line2}
              <br />
              {siteConfig.address.city}, {siteConfig.address.country}
            </address>
            <TrackedLink
              href={`tel:${siteConfig.phoneIntl}`}
              event={ANALYTICS_EVENTS.phoneClick}
              className={mutedLink}
            >
              {siteConfig.phone}
            </TrackedLink>
            <TrackedLink
              href={`mailto:${siteConfig.email}`}
              event={ANALYTICS_EVENTS.emailClick}
              className={mutedLink}
            >
              {siteConfig.email}
            </TrackedLink>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className={mutedLink}>
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-6">
            <LanguageSwitcher />
            {socialEntries.length > 0 && (
              <nav aria-label="Social" className="flex gap-4">
                {socialEntries.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={mutedLink}
                  >
                    {platform}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>

        <Divider />

        <div className="flex flex-col gap-4 text-xs text-muted md:flex-row md:justify-between">
          <p>
            © {year} {siteConfig.firmName}. {tFooter("rights")}
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              {tFooter("privacy")}
            </Link>
            <Link
              href="/legal"
              className="hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              {tFooter("legal")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
