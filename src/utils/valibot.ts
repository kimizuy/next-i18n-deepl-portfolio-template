import { Output, date, is, object, string } from "valibot";

const FrontmatterSchema = object({
  title: string(),
  publishedAt: date(),
});

export function isFrontmatter(
  value: unknown
): value is Output<typeof FrontmatterSchema> {
  return is(FrontmatterSchema, value);
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe("isFrontmatter returns true when the value is a frontmatter", () => {
    it("returns true", () => {
      const frontmatter = {
        title: "titl",
        publishedAt: new Date(),
      };
      expect(isFrontmatter(frontmatter)).toBe(true);
    });
  });

  describe("isFrontmatter returns false when the value is not a frontmatter", () => {
    it("returns false", () => {
      const frontmatter = {
        title: "titl",
        publishedAt: "2021-08-20",
      };
      expect(isFrontmatter(frontmatter)).toBe(false);
    });
  });
}
