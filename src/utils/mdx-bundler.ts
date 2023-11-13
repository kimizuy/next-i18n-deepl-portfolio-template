import { existsSync } from "fs";
import { bundleMDX as bundleMDXPrimitive } from "mdx-bundler";
import path from "path";
import remarkMdxImages from "remark-mdx-images";

export async function bundleMDX(options: {
  source: string;
  cwd?: string;
  imagesUrl?: string;
}) {
  const { source, cwd, imagesUrl } = options;

  return await bundleMDXPrimitive({
    source,
    cwd,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        // ref: https://www.timjfoster.com/posts/mdx-bundler-with-images
        remarkMdxImages,
      ];

      return options;
    },
    esbuildOptions: imagesUrl
      ? (options) => {
          options.outdir = path.join(process.cwd(), "public", imagesUrl);
          options.loader = {
            ...options.loader,
            ".avif": "file",
            ".webp": "file",
            ".png": "file",
            ".jpg": "file",
            ".jpeg": "file",
            ".gif": "file",
          };
          options.publicPath = `/${imagesUrl}`;
          options.write = true;

          return options;
        }
      : undefined,
  });
}

export function getFilePath(targetFolderPath: string): string {
  const mdFilePath = path.join(targetFolderPath, "index.md");
  const mdxFilePath = path.join(targetFolderPath, "index.mdx");

  if (existsSync(mdFilePath)) {
    return mdFilePath;
  } else if (existsSync(mdxFilePath)) {
    return mdxFilePath;
  } else {
    throw new Error(
      `Neither index.md nor index.mdx file found for page: ${targetFolderPath}`
    );
  }
}
