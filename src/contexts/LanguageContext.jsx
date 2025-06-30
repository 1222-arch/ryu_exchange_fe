import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const getInitialLang = () => {
    const saved = localStorage.getItem('appLanguage');
    if (saved) return saved;
    return navigator.language.startsWith('ja') ? 'jp' : 'en';
  };

  const [language, setLanguage] = useState(getInitialLang);

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
