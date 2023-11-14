"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { i18nConfig } from "@/utils/i18n-config";
import { isLocale } from "@/utils/type-predicates";

type Props = ComponentProps<typeof NextLink>;

export function Link({ href, ...props }: Props) {
  const currentPathname = usePathname();
  const currentLocale = getLocaleFromPath(currentPathname);
  const hrefStr = href.toString();
  const shouldSwitchLanguage = isLocale(hrefStr.split("/").filter(Boolean)[0]);
  const isDefaultLocale = currentLocale === i18nConfig.defaultLocale;
  const newHref = (() => {
    if (isDefaultLocale) {
      return shouldSwitchLanguage ? `${href}${currentPathname}` : href;
    } else {
      const [_, ...rest] = currentPathname.split("/").filter(Boolean);
      return shouldSwitchLanguage
        ? `${href}/${rest.join("/")}`
        : `/${currentLocale}${href}`;
    }
  })();

  const handleClick = () => {
    if (!shouldSwitchLanguage) return;
    const newLocale = getLocaleFromPath(hrefStr);
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;
  };

  return <NextLink {...props} onClick={handleClick} href={newHref} />;
}

function getLocaleFromPath(path: string) {
  const [firstSegment] = path.split("/").filter(Boolean);
  return isLocale(firstSegment) ? firstSegment : i18nConfig.defaultLocale;
}
