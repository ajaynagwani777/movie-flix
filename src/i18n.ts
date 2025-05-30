import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { arStrings, enStrings } from './utils/strings';


export const defaultNS = 'enStrings';
export const resources = {
   en: { translation: enStrings },
  ar: { translation: arStrings },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  compatibilityJSON: 'v4',
  ns: ['enStrings', 'arStrings'],
  fallbackLng: 'en',
  defaultNS,
  resources,
});

export default i18n;

