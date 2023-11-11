import { exit } from "process";
import { cache } from "react";
import { POST_FILE_PATHS } from "./constants";
import { getErrorMessage } from "./helper";
import { bundlePost } from "./mdx-bundler";
import { isFrontmatter } from "./type-predicates";

export const getPost = async (slug: string) => {
  try {
    const { code, frontmatter } = await bundlePost(slug);
    if (!isFrontmatter(frontmatter)) {
      throw new Error(`Invalid format in "${slug}/index.mdx".`);
    }
    return { code, frontmatter, slug };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(`${slug}: ${errorMessage}`);
    exit(1);
  }
};

export const getAllPosts = cache(async () => {
  const posts = await Promise.all(
    POST_FILE_PATHS.map(async (slug) => await getPost(slug))
  );
  const sortedDescByDate = posts.sort((a, b) =>
    a.frontmatter.publishedAt > b.frontmatter.publishedAt ? -1 : 1
  );

  return sortedDescByDate;
});
