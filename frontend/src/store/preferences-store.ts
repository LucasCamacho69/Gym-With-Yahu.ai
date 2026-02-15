import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PreferencesState {
  isDarkMode: boolean;
  language: 'pt' | 'en';
  toggleTheme: () => void;
  setLanguage: (lang: 'pt' | 'en') => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      language: 'pt',
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);