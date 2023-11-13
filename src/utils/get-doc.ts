import path from "path";
import { DOCS_PATH } from "./constants";
import { bundleMDX, getFilePath } from "./mdx-bundler";
import { readFileSync } from "fs";
import { getErrorMessage } from "./helpers";
import { cache } from "react";

export const getDoc = cache(async (page: "home" | "about") => {
  const filePath = getFilePath(path.join(DOCS_PATH, page));
  const source = readFileSync(filePath, "utf-8");
  try {
    const { code } = await bundleMDX({ source });
    return { code };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
    process.exit(1);
  }
});
