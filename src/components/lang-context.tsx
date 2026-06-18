import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
}
const LangCtx = createContext<Ctx>({ lang: DEFAULT_LANG, setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("noyis-lang") : null;
    if (isLang(stored ?? undefined)) setLangState(stored as Lang);
    else if (typeof navigator !== "undefined") {
      const nav = navigator.language.slice(0, 2);
      if (isLang(nav)) setLangState(nav);
    }
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("noyis-lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}
