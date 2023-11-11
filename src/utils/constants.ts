import fs from "fs";
import path from "path";

export const DOCS_PATH = path.join(process.cwd(), "_docs");
export const POSTS_PATH = path.join(process.cwd(), "_posts");
export const POST_FILE_PATHS = fs.readdirSync(POSTS_PATH);
