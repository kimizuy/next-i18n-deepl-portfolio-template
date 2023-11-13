"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18nConfig } from "@/utils/i18n-config";
import { isLocale } from "@/utils/type-predicates";
import { Locale } from "@/utils/type";

export function LocaleSwitcher() {
  const currentPathname = usePathname();
  const currentLocale = getLocaleFromPath(currentPathname);
  const getRedirectPathname = (locale: Locale) => {
    if (currentLocale === locale) return currentPathname;

    if (currentLocale === i18nConfig.defaultLocale) {
      return "/" + locale + currentPathname;
    }
    return currentPathname.replace(`/${currentLocale}`, `/${locale}`);
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {i18nConfig.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={getRedirectPathname(locale)}>{locale}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function getLocaleFromPath(path: string) {
  const [firstSegment] = path.split("/").filter((v) => !!v);
  if (isLocale(firstSegment)) {
    return firstSegment;
  }
  return i18nConfig.defaultLocale;
}
