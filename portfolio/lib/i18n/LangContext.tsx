'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { translations, type Lang, type Translations } from './translations';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
});

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'es';
  const stored = localStorage.getItem('lang') as Lang | null;
  if (stored === 'es' || stored === 'en') return stored;
  return navigator.language.startsWith('en') ? 'en' : 'es';
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem('lang', l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
