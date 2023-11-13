import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import { Link } from "./link";
import { Locale } from "@/utils/type";
import { translateWithDeepL } from "@/utils/translate-with-deepl";
import { createElement } from "react";

type ElementKey = keyof JSX.IntrinsicElements;

interface Props {
  code: string;
  lang: Locale | undefined;
}

export async function MDXComponent({ code, lang }: Props) {
  const Component = getMDXComponent(code);
  const tags: ElementKey[] = ["h1", "h2", "h3", "h4", "h5", "p", "li"];
  const translatedComponents = tags.reduce<
    Record<string, React.ComponentType<any>>
  >((acc, tag) => {
    acc[tag] = async ({ children, ...rest }) =>
      createElement(tag, rest, await translateWithDeepL(children, lang));
    return acc;
  }, {});

  return (
    <div className="prose max-w-full dark:prose-invert">
      <Component
        components={{
          img: ({ alt, src }) => {
            if (!src) return null;
            return (
              <span className="relative my-12 block h-0 overflow-hidden pt-[calc(9/16*100%)]">
                <Image
                  alt={alt ?? ""}
                  src={src}
                  fill
                  className="m-0 object-contain"
                />
              </span>
            );
          },
          a: async ({ children, href, className, ...rest }) => {
            if (!href || typeof children !== "string") return null;
            const translated = await translateWithDeepL(children, lang);
            if (isFullUrl(href)) {
              return (
                <a
                  {...rest}
                  href={href}
                  className={className}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translated}
                </a>
              );
            } else {
              return (
                <Link href={href} className={className}>
                  {translated}
                </Link>
              );
            }
          },
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
