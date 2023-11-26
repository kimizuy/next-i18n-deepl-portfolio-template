import path from "path";
import { bundleMDX, getFilePath } from "./mdx-bundler";
import { readFileSync } from "fs";
import { getErrorMessage } from "./helpers";
import { cache } from "react";
import { isFrontmatter } from "./valibot";

const POSTS_PATH = path.join(process.cwd(), "_posts");

export const getPost = cache(async (slug: string) => {
  try {
    const filePath = getFilePath(path.join(POSTS_PATH, slug));
    const source = readFileSync(filePath, "utf-8");
    const cwd = path.join(POSTS_PATH, slug);
    const imagesUrl = path.join("_posts", slug);
    const { code, matter } = await bundleMDX({ source, cwd, imagesUrl });
    const frontmatter = matter.data;
    if (!isFrontmatter(frontmatter)) {
      throw new Error(`Invalid format in "${filePath}".`);
    }
    return { code, frontmatter, slug };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(`${slug}: ${errorMessage}`);
    process.exit(1);
  }
});
