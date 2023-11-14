"use client";

import { i18nConfig } from "@/utils/i18n-config";
import { isLocale } from "@/utils/type-predicates";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LanguageChanger() {
  const router = useRouter();
  const currentPathname = usePathname();
  const [first] = currentPathname.split("/").filter(Boolean);
  const currentLocale = isLocale(first) ? first : i18nConfig.defaultLocale;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push("/" + newLocale);
  };

  return (
    <select onChange={handleChange} value={currentLocale}>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="ja">日本語</option>
    </select>
  );
}
