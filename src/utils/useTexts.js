import { useLanguage } from 'src/contexts/LanguageContext';
import en from 'src/locales/en.json';
import jp from 'src/locales/jp.json';

const useTexts = () => {
  const { language } = useLanguage();
  return language === 'en' ? en : jp;
};

export default useTexts;
