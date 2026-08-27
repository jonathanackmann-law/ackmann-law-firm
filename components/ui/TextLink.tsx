import type { ComponentPropsWithoutRef } from "react";
import { Link } from "@/lib/i18n/navigation";

export function TextLink({
  className = "",
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={`underline decoration-muted underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${className}`}
      {...props}
    />
  );
}
