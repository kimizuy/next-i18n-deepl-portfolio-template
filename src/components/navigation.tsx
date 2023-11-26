"use client";

import { Globe, MenuIcon } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Link } from "./link";
import { usePathname, useRouter } from "next/navigation";
import { Locale, i18nConfig, isLocale, languages } from "@/utils/i18n-config";
import { getDictionary } from "@/utils/get-dictionary";
import { ModeToggle } from "./mode-toggle";

type Props = { lang: Locale };

export function Navigation({ lang }: Props) {
  const dictionary = getDictionary(lang);

  return (
    <nav className="flex gap-2 md:gap-4">
      {/* Mobile menu */}
      <div className="flex md:hidden">
        <Popover.Root>
          <Popover.Trigger asChild>
            <button aria-label="Open navigation">
              <MenuIcon />
            </button>
          </Popover.Trigger>
          <Popover.Anchor />
          <Popover.Portal>
            <Popover.Content className="z-20 m-2 grid place-items-start gap-2 border bg-background p-4 md:hidden">
              <Link href="/blog">Blog</Link>
              <Link href="/about">About</Link>
              <div className="my-1 w-full border-t" />
              <Globe
                size={16}
                className="text-muted-foreground"
                aria-label={dictionary.language}
              />
              <LanguageChanger lang={lang} />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      {/* Desktop menu */}
      <div className="hidden gap-4 md:flex">
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
        <div className="flex">
          <Popover.Root>
            <Popover.Trigger asChild>
              <button aria-label="Switch language">
                <Globe />
              </button>
            </Popover.Trigger>
            <Popover.Anchor />
            <Popover.Portal>
              <Popover.Content className="z-20 m-2 hidden place-items-start gap-2 border bg-background p-4 md:grid">
                <LanguageChanger lang={lang} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>

      <ModeToggle />
    </nav>
  );
}

function LanguageChanger({ lang }: Props) {
  const router = useRouter();
  const currentPathname = usePathname();
  const [first, ...rest] = currentPathname.split("/").filter(Boolean);
  const isDefaultLocaleNow = !isLocale(first);

  const handleClick = (newLocale: string) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;
    if (isDefaultLocaleNow) {
      // "/about" -> "/en/about"
      router.push("/" + newLocale + currentPathname);
      return;
    }
    // "/en/about" -> "/ja/about"
    router.push("/" + newLocale + "/" + rest.join("/"));
  };

  return (
    <>
      {i18nConfig.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => handleClick(locale)}
          className={`${
            locale === lang
              ? "font-bold text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {languages[locale]}
        </button>
      ))}
    </>
  );
}
