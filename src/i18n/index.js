import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import english from "./en.json";
import kannada from "./kn.json";

const resources = {
  en: {
    english,
  },
  kn: {
    kannada,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources,
    fallbackLng: "en",
    lng: "kn",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
