import "server-only";
import type { Locale } from "./type";
import { i18nConfig } from "./i18n-config";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  de: () => import("../dictionaries/de.json").then((module) => module.default),
  ja: () => import("../dictionaries/ja.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale | undefined) =>
  locale ? dictionaries[locale]() : dictionaries[i18nConfig.defaultLocale]();
