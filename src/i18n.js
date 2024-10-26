import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

import translationEN from './lang/en.json';
import translationES from './lang/es.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
.use(initReactI18next)
.use(I18nextBrowserLanguageDetector)
.init({
  resources,
  fallbackLng: "en",

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;