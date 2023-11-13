import fs from "fs";
import path from "path";

export const DOCS_PATH = path.join(process.cwd(), "_docs"),
  POSTS_PATH = path.join(process.cwd(), "_posts"),
  POST_FILE_PATHS = fs.readdirSync(POSTS_PATH),
  SITE_TITLE = "sloth.dev";
