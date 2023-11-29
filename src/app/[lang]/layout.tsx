import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Link } from "@/components/link";
import IconPic from "../icon.png";
import Image from "next/image";
import { Locale } from "@/utils/i18n-config";
import { getDictionary } from "@/utils/get-dictionary";
import { Navigation } from "@/components/navigation";
import { i18nConfig } from "@/utils/i18n-config";
import { ThemeProvider } from "@/components/theme-provider";

const SITE_TITLE = "sloth.dev";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: { lang: Locale };
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params: { lang } }: Props) {
  const dictionaly = getDictionary(lang);

  return {
    title: {
      template: `%s | ${SITE_TITLE}`,
      default: SITE_TITLE,
    },
    description: dictionaly.siteDescription,
  };
}

export type PageProps = Omit<Props, "children">;

export default function RootLayout({ children, params }: Props) {
  const dictionary = getDictionary(params.lang);
  const isDefaultLocale = params.lang === i18nConfig.defaultLocale;

  return (
    <html lang={params.lang} className="scroll-p-20">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid min-h-screen grid-cols-[100%] grid-rows-[auto,1fr,auto]">
            <header className="sticky top-0 z-10 grid h-16 place-items-center border-b bg-background px-4 md:px-8">
              <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-1 text-xl font-bold text-foreground"
                >
                  <span className="relative h-[1.8em] w-[1.8em]">
                    <Image
                      src={IconPic}
                      alt=""
                      sizes="36px"
                      fill
                      priority
                      className="object-contain"
                    />
                    <span className="sr-only">{dictionary.home}</span>
                  </span>
                  {SITE_TITLE}
                </Link>
                <Navigation lang={params.lang} />
              </div>
            </header>
            <main className="relative p-[2rem_1rem_8rem] md:p-[3rem_2rem_12rem]">
              <div className="mx-auto max-w-3xl">{children}</div>
              {!isDefaultLocale ? (
                <small
                  className="absolute bottom-4 right-4 text-muted-foreground sm:bottom-8 sm:right-8"
                  dangerouslySetInnerHTML={{ __html: dictionary.note }}
                />
              ) : null}
            </main>
            <footer className="grid h-16 place-items-center border-t px-4 md:px-8">
              <div className="mx-auto grid w-full max-w-5xl items-center">
                <div className="place-self-center">
                  © 2023{" "}
                  <a
                    href="https://github.com/kimizuy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kimizu Yamasaki
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
