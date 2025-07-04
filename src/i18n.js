import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import jp from './locales/jp.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      jp: { translation: jp },
    },
    lng: 'en', // ngôn ngữ mặc định
    fallbackLng: 'en', // nếu không tìm thấy thì fallback

    interpolation: {
      escapeValue: false, // React đã escape 
    },
  });

export default i18n;
