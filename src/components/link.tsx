"use client";

import NextLink from "next/link";
import { i18nConfig } from "../utils/i18nConfig";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof NextLink>;

export function Link({ href, ...props }: Props) {
  const pathname = usePathname();
  const locale = extractLocaleFromPath(pathname);
  const newHref = locale ? `/${locale}${href}` : href;

  return <NextLink {...props} href={newHref} />;
}

function extractLocaleFromPath(path: string): string | null {
  const segments = path.split("/").filter(Boolean);
  if (i18nConfig.locales.includes(segments[0])) {
    return segments[0];
  }
  return null;
}
