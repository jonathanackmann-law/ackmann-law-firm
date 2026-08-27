import type { ComponentPropsWithoutRef } from "react";

export function Eyebrow({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={`text-eyebrow uppercase tracking-[0.2em] text-muted ${className}`}
      {...props}
    />
  );
}
