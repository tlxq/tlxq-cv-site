import { useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';
import en from '../locales/en.json';
import sv from '../locales/sv.json';

const translations = { en, sv };

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang');
    if (saved) return saved;
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'sv';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      if (!result || result[key] === undefined) return path;
      result = result[key];
    }
    return result;
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'sv' ? 'en' : 'sv'));
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
