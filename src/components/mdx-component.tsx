import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import { Link } from "./link";
import { Locale } from "@/utils/i18n-config";
import { translateWithDeepL } from "@/utils/translate-with-deepl";
import { createElement } from "react";
import { cn } from "@/utils/helpers";
import { i18nConfig } from "@/utils/i18n-config";
import { getDictionary } from "@/utils/get-dictionary";

interface Props {
  code: string;
  lang: Locale;
  slug?: string;
}

export async function MDXComponent({ code, lang, slug }: Props) {
  const Component = getMDXComponent(code);
  const dictionary = getDictionary(lang);
  const isDefaultLocale = lang === i18nConfig.defaultLocale;

  return (
    <div className="prose max-w-full dark:prose-invert">
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
          a: async ({ children, href, id, className, ...rest }) => {
            if (!href) return null;
            const translated = await translateWithDeepL(children, lang);
            if (isFullUrl(href)) {
              return (
                <a
                  {...rest}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {translated}
                </a>
              );
            } else {
              const isAnchor = href.startsWith("#");
              const newHref = isAnchor && slug ? `/blog/${slug}${href}` : href;
              return (
                <Link id={id} href={newHref} className={className}>
                  {translated}
                </Link>
              );
            }
          },
          code: ({ className, ...rest }) => (
            <code {...rest} className={cn(className, "w-0 block")} />
          ),
          ...translatedComponents(
            ["h1", "h2", "h3", "h4", "h5", "p", "li", "th", "td", "del"],
            lang
          ),
        }}
      />
      {!isDefaultLocale ? (
        <small
          className="ml-auto block w-fit text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: dictionary.note }}
        />
      ) : null}
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

type ElementKey = keyof JSX.IntrinsicElements;

const translatedComponents = (targetTags: ElementKey[], lang: Locale) =>
  targetTags.reduce<Record<string, React.ComponentType<any>>>((acc, tag) => {
    acc[tag] = async ({ children, ...rest }) =>
      createElement(tag, rest, await translateChildren(children, lang));
    return acc;
  }, {});

const translateChildren = async (children: any, lang: Locale) => {
  // translate children for nested sentences
  // e.g. <p>foo <strong>bar</strong></p>
  if (Array.isArray(children)) {
    children = await Promise.all(
      children.map(async (child) =>
        typeof child === "string"
          ? await translateWithDeepL(child, lang)
          : child
      )
    );
  }
  return await translateWithDeepL(children, lang);
};
