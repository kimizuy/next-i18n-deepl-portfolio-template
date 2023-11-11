import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import { Link } from "./link";

interface Props {
  code: string;
}

export function MDXComponent({ code }: Props) {
  const Component = getMDXComponent(code);

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
                  className="object-contain"
                />
              </span>
            );
          },
          a: ({ children, href, className, ...rest }) => {
            if (!href) return null;
            if (isFullUrl(href)) {
              return (
                <a
                  {...rest}
                  href={href}
                  className={className}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              );
            } else {
              return (
                <Link href={href} className={className}>
                  {children}
                </Link>
              );
            }
          },
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
