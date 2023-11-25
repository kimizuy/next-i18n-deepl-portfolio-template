import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import { Link } from "./link";
import { Locale } from "@/utils/types";
import { translateWithDeepL } from "@/utils/translate-with-deepl";
import { createElement } from "react";
import { cn } from "@/utils/helpers";
import { i18nConfig } from "@/utils/i18n-config";
import { getDictionary } from "@/utils/get-dictionary";

type ElementKey = keyof JSX.IntrinsicElements;

interface Props {
  code: string;
  lang: Locale;
  slug?: string;
}

export async function MDXComponent({ code, lang, slug = "" }: Props) {
  const Component = getMDXComponent(code);
  const translateTargetTags: ElementKey[] = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "p",
    "li",
  ];
  const translatedComponents = translateTargetTags.reduce<
    Record<string, React.ComponentType<any>>
  >((acc, tag) => {
    acc[tag] = async ({ children, ...rest }) =>
      createElement(tag, rest, await translateWithDeepL(children, lang));
    return acc;
  }, {});
  const isDefaultLocale = lang === i18nConfig.defaultLocale;
  const dictionary = getDictionary(lang);

  return (
    <div className="prose max-w-full dark:prose-invert">
      {!isDefaultLocale ? (
        <small
          className="ml-auto block w-fit text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: dictionary.note }}
        />
      ) : null}
      <Component
        components={{
          img: ({ alt, src }) => {
            if (!src) return null;
            return (
              <span className="relative block h-0 overflow-hidden pt-[calc(9/16*100%)]">
                <Image
                  alt={alt ?? ""}
                  src={src}
                  fill
                  className="m-0 object-cover"
                />
              </span>
            );
          },
          a: async ({ children, href, ...rest }) => {
            if (!href) return null;
            const translated = await translateWithDeepL(children, lang);
            if (isFullUrl(href)) {
              return (
                <a
                  {...rest}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translated}
                </a>
              );
            } else {
              const isAnchor = href.startsWith("#");
              const footnoteId = isAnchor
                ? convertFnAndFnref(href.slice(1))
                : undefined;
              const newHref = isAnchor ? `/blog/${slug}${href}` : href;
              return (
                <Link id={footnoteId} href={newHref}>
                  {translated}
                </Link>
              );
            }
          },
          code: ({ className, ...rest }) => (
            <code {...rest} className={cn(className, "w-0 block")} />
          ),
          ...translatedComponents,
        }}
      />
    </div>
  );
}

function isFullUrl(url: string): boolean {
  try {
    new URL(url);

    return true;
  } catch (error) {
    return false;
  }
}

function convertFnAndFnref(str: string) {
  return str.replace(/fnref|fn/g, (match) => (match === "fn" ? "fnref" : "fn"));
}
