import { POST_FILE_PATHS } from "@/utils/constants";
import { getErrorMessage } from "@/utils/helper";
import { bundlePost } from "@/utils/mdx-bundler";
import { isFrontmatter } from "@/utils/type-predicates";
import { exit } from "process";
import { format } from "date-fns";
import { MDXComponent } from "@/components/mdx-component";
import { ChevronLeft } from "lucide-react";
import { Link } from "@/components/link";
import { PageProps } from "../../layout";
import { getDictionary } from "@/utils/get-dictionary";

export function generateStaticParams() {
  const slugs = POST_FILE_PATHS.map((slug) => ({ slug }));

  return slugs;
}

type Props = { params: { slug: string } } & PageProps;

export default async function Page({ params }: Props) {
  const { code, frontmatter } = await getPost(params.slug);
  const dictionary = await getDictionary(params.lang);

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
        <MDXComponent code={code} />
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

const getPost = async (slug: string) => {
  try {
    const { code, frontmatter } = await bundlePost(slug);
    if (!isFrontmatter(frontmatter)) {
      throw new Error(`Invalid format in "${slug}/index.mdx".`);
    }

    return { code, frontmatter };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(`${slug}: ${errorMessage}`);
    exit(1);
  }
};
