import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, logout as storeLogout } from '../data/store';
import { t } from '../i18n/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('mm_theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('mm_lang') || 'en');
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, [refreshTick]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mm_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('mm_lang', lang);
  }, [lang]);

  const refresh = useCallback(() => setRefreshTick(tick => tick + 1), []);
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(l => l === 'en' ? 'hi' : 'en');

  const logout = () => {
    storeLogout();
    setCurrentUser(null);
    refresh();
  };

  // Convenience: translate using current lang
  const tr = (key) => t(lang, key);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, theme, toggleTheme, lang, toggleLang, tr, refresh, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
