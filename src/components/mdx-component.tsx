import path from "path";
import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import { Link } from "./link";
import { cn } from "@/utils/helpers";
import { Locale } from "@/utils/i18n-config";
import { translateText } from "@/utils/translate-with-deepl";

interface Props {
  code: string;
  lang: Locale;
  slug?: string;
}

export async function MDXComponent({ code, lang, slug }: Props) {
  const Component = getMDXComponent(code);

  return (
    <div className="prose max-w-full dark:prose-invert">
      <Component
        components={{
          img: async ({ alt, src }) => {
            if (!src) return null;
            const translatedAlt = alt
              ? await translateText({
                  text: alt,
                  targetLang: lang,
                  context: "Image alt text",
                })
              : "";
            return (
              <span className="relative block h-0 overflow-hidden pt-[calc(9/16*100%)]">
                <Image
                  alt={translatedAlt}
                  src={src}
                  fill
                  className="m-0 object-cover"
                />
              </span>
            );
          },
          a: async ({ children, href, id, className, ...rest }) => {
            if (!href) return null;
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
                  {children}
                </a>
              );
            } else {
              const isAnchor = href.startsWith("#");
              const newHref =
                isAnchor && slug ? path.join("/", "blog", slug, href) : href;
              return (
                <Link id={id} href={newHref} className={className}>
                  {children}
                </Link>
              );
            }
          },
          pre: ({ className, ...rest }) => (
            <pre
              {...rest}
              className={cn(className, "[&>code]:w-0 [&>code]:block")}
            />
          ),
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
