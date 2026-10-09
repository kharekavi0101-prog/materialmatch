import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, getStore, logout as storeLogout } from '../data/store';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('mm_theme') || 'dark');
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, [refreshTick]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mm_theme', theme);
  }, [theme]);

  const refresh = useCallback(() => setRefreshTick(t => t + 1), []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const logout = () => {
    storeLogout();
    setCurrentUser(null);
    refresh();
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, theme, toggleTheme, refresh, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
