import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import it from './locales/it/translation.json';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      it: { translation: it }
    },
    fallbackLng: 'es',
    interpolation: { escapeValue: false }
  });

export default i18next;

