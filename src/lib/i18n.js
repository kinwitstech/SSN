import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/i18n/en.json";
import kn from "@/i18n/kn.json";

const resources = {
  en: {
    translation: en,
  },
  kn: {
    translation: kn,
  },
};

i18n.use(initReactI18next).init({
  debug: true,
  resources,
  fallbackLng: "en",
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
