import type { Locale } from "./i18n-config";
import { ja } from "@/dictionaries/ja";
import { en } from "@/dictionaries/en";
import { fr } from "@/dictionaries/fr";

const dictionaries = {
  ja,
  "en-US": en,
  fr,
};

export const getDictionary = (locale: Locale) => dictionaries[locale];
