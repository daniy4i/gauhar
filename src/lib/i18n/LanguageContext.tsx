import React, { createContext, useContext, ReactNode } from 'react';
import { Language, translations, TranslationStrings } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationStrings;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Fixed to Russian only - no language switching
  const language: Language = 'ru';

  const value: LanguageContextType = {
    language,
    setLanguage: () => {}, // No-op since we're Russian only
    t: translations[language],
    toggleLanguage: () => {}, // No-op since we're Russian only
  };

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
