import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, TranslationStrings } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationStrings;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'gauhar-portfolio-lang';

function getInitialLanguage(): Language {
  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'ru' || stored === 'en') {
    return stored;
  }
  // Default to Russian (no browser detection)
  return 'ru';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ru');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLanguageState(initialLang);
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    // Update document lang attribute
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    const newLang = language === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
  };

  // Update document lang on mount and language change
  useEffect(() => {
    if (isInitialized) {
      document.documentElement.lang = language;
    }
  }, [language, isInitialized]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    toggleLanguage,
  };

  // Prevent flash of wrong language
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
