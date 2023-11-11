import { getMDXComponent } from "mdx-bundler/client";
import Link from "next/link";
import Image from "next/image";

interface Props {
  code: string;
}

export function MDXComponent({ code }: Props) {
  const Component = getMDXComponent(code);

  return (
    <div className="[&>*+*]:mt-[1em]">
      <Component
        components={{
          img: ({ alt, src }) => {
            if (!src) return null;
            return (
              <div className="relative h-0 overflow-hidden pt-[calc(9/16*100%)]">
                <Image
                  alt={alt ?? ""}
                  src={src}
                  fill
                  className="object-contain"
                />
              </div>
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
