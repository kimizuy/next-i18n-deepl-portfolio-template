import fs from "fs";
import path from "path";
import { format } from "date-fns";
import { MDXComponent } from "@/components/mdx-component";
import { ChevronLeft } from "lucide-react";
import { Link } from "@/components/link";
import { PageProps } from "../../layout";
import { getDictionary } from "@/utils/get-dictionary";
import { getPost } from "@/utils/get-post";
import "@/styles/prism-vsc-dark-plus.css";
import { Suspense } from "react";

type Props = { params: { slug: string } } & PageProps;

export function generateStaticParams() {
  const postFilePaths = fs.readdirSync(path.join(process.cwd(), "_posts"));
  return postFilePaths.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug, lang } }: Props) {
  const post = await getPost(slug, lang);

  return {
    title: post.frontmatter.title,
  };
}

export default async function Page({ params: { slug, lang } }: Props) {
  const { code, frontmatter } = await getPost(slug, lang);
  const dictionary = getDictionary(lang);

  return (
    <div className="grid gap-16">
      <header>
        <h1 className="text-3xl font-bold tracking-tighter">
          {frontmatter.title}
        </h1>
        <div className="mt-4 text-sm">
          <time dateTime={frontmatter.publishedAt.toISOString()}>
            {format(frontmatter.publishedAt, "yyyy-MM-dd")}
          </time>
        </div>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <MDXComponent code={code} lang={lang} slug={slug} />
        </Suspense>
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
