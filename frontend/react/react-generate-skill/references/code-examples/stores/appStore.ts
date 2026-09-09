// src/stores/appStore.ts
// 全局 app 状态（侧边栏折叠、主题、面包屑、全局 loading）

import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

interface AppState {
  sidebarCollapsed: boolean;
  themeMode: ThemeMode;
  breadcrumb: string[];
  loading: boolean;
}

interface AppActions {
  toggleSidebar: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  setBreadcrumb: (items: string[]) => void;
  setLoading: (value: boolean) => void;
  reset: () => void;
}

export type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>()((set) => ({
  // ========== State ==========
  sidebarCollapsed: false,
  themeMode: 'light',
  breadcrumb: [],
  loading: false,

  // ========== Actions ==========
  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setThemeMode: (mode) => {
    set({ themeMode: mode });
  },

  setBreadcrumb: (items) => {
    set({ breadcrumb: items });
  },

  setLoading: (value) => {
    set({ loading: value });
  },

  // ========== Reset ==========
  reset: () => {
    set({ sidebarCollapsed: false, themeMode: 'light', breadcrumb: [], loading: false });
  },
}));
