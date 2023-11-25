// NOTE: After updating this file, run `gen:type-predicates`.
import { i18nConfig } from "./i18n-config";

export type Frontmatter = {
  title: string;
  publishedAt: Date;
};

export type Locale = (typeof i18nConfig)["locales"][number];
