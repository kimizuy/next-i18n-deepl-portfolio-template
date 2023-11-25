import { Output, date, is, object, string } from "valibot";

const FrontmatterSchema = object({
  title: string(),
  publishedAt: date(),
});

export const isFrontmatter = (
  value: unknown
): value is Output<typeof FrontmatterSchema> => is(FrontmatterSchema, value);
