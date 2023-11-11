import { getAllPosts } from "@/utils/blog";
import { Link } from "@/components/link";
import { format } from "date-fns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="flex gap-1">
            <time dateTime={post.frontmatter.publishedAt.toISOString()}>
              {format(post.frontmatter.publishedAt, "yyyy-MM-dd")}
            </time>{" "}
            <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
