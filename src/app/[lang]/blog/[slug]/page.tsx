import { POST_FILE_PATHS } from "@/utils/constants";
import { format } from "date-fns";
import { MDXComponent } from "@/components/mdx-component";
import { ChevronLeft } from "lucide-react";
import { Link } from "@/components/link";
import { PageProps } from "../../layout";
import { getDictionary } from "@/utils/get-dictionary";
import { getPost } from "@/utils/get-post";
import { translateWithDeepL } from "@/utils/translate-with-deepl";

export function generateStaticParams() {
  const slugs = POST_FILE_PATHS.map((slug) => ({ slug }));

  return slugs;
}

type Props = { params: { slug: string } } & PageProps;

export default async function Page({ params: { slug, lang } }: Props) {
  const { code, frontmatter } = await getPost(slug);
  const dictionary = await getDictionary(lang);

  return (
    <div className="grid gap-16">
      <header>
        <h1 className="text-3xl font-bold tracking-tighter">
          {translateWithDeepL(frontmatter.title, lang)}
        </h1>
        <div className="mt-4 text-sm">
          <time dateTime={frontmatter.publishedAt.toISOString()}>
            {format(frontmatter.publishedAt, "yyyy-MM-dd")}
          </time>
        </div>
      </header>
      <main>
        <MDXComponent code={code} lang={lang} />
      </main>
      <footer>
        <Link href="/blog" className="flex gap-1">
          <ChevronLeft />
          {dictionary.backToBlogTop}
        </Link>
      </footer>
    </div>
  );
}
