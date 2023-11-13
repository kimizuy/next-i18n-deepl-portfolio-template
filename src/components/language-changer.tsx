"use client";

import { getLocaleFromPath } from "@/utils/helpers";
import { i18nConfig } from "@/utils/i18n-config";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ChangeEvent } from "react";

// ref: https://github.com/i18nexus/next-i18n-router/blob/main/examples/i18next-example/components/LanguageChanger.tsx
export function LanguageChanger() {
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = getLocaleFromPath(currentPathname);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (newLocale === currentLocale) return;
    if (newLocale === i18nConfig.defaultLocale) {
      const newPathname = currentPathname.replace(`/${currentLocale}`, "");
      router.push("/" + newLocale + newPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }
  };

  return (
    <select
      onChange={handleChange}
      value={currentLocale}
      className="border text-black"
    >
      <option value="ja">日本語</option>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
    </select>
  );
}
