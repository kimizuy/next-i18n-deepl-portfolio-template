"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { isLocale } from "@/utils/type-predicates";

type Props = ComponentProps<typeof NextLink>;

export function Link({ href, ...props }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const newHref = locale ? `/${locale}${href}` : href;

  return <NextLink {...props} href={newHref} />;
}

function getLocaleFromPath(path: string) {
  const [firstSegment] = path.split("/").filter((v) => !!v);
  if (isLocale(firstSegment)) {
    return firstSegment;
  }
  return null;
}
