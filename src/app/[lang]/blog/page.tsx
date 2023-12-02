import fs from "fs";
import path from "path";
import { Link } from "@/components/link";
import { format } from "date-fns";
import { Metadata } from "next";
import { PageProps } from "../layout";
import { Locale } from "@/utils/i18n-config";
import { getPost } from "@/utils/get-post";

export const metadata: Metadata = {
  title: "Blog",
};

type Props = PageProps;

export default async function Page({ params: { lang } }: Props) {
  const postMatters = await getAllPostMatters(lang);

  return (
    <div>
      <ul className="grid gap-4">
        {postMatters.map((matter) => (
          <li key={matter.slug} className="flex flex-wrap gap-2">
            <time dateTime={matter.publishedAt.toISOString()}>
              {format(matter.publishedAt, "yyyy-MM-dd")}
            </time>
            <Link href={`/blog/${matter.slug}`}>{matter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const getAllPostMatters = async (lang: Locale) => {
  const postFilePaths = fs.readdirSync(path.join(process.cwd(), "_posts"));
  const posts = await Promise.all(
    postFilePaths.map(async (slug) => {
      const { frontmatter } = await getPost(slug, lang);
      return {
        ...frontmatter,
        slug,
      };
    })
  );
  const sortedDescByDate = posts.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  );

  return sortedDescByDate;
};
