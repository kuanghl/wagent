// src/stores/userStore.ts
// 用户 Zustand store（含 token / refreshToken / profile）

import { create } from 'zustand';
import type { User } from '@/types/user';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';

interface UserState {
  token: string | null;
  refreshToken: string | null;
  profile: User | null;
  loading: boolean;
}

interface UserActions {
  setToken: (value: string) => void;
  setRefreshToken: (value: string) => void;
  setProfile: (user: User) => void;
  setLoading: (value: boolean) => void;
  clearToken: () => void;
  clearProfile: () => void;
  logout: () => void;
  reset: () => void;
}

export type UserStore = UserState & UserActions;

/**
 * 唯一允许 localStorage 操作的位置。
 * utils/auth.ts、auth.service.ts、组件都通过本 store 读写 token，
 * 严禁在 store 外部直接读写 localStorage（见 SKILL.md 红线 #8）。
 */
export const useUserStore = create<UserStore>()((set) => ({
  // ========== State ==========
  token: localStorage.getItem(TOKEN_KEY),
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  profile: null,
  loading: false,

  // ========== Actions ==========
  setToken: (value) => {
    localStorage.setItem(TOKEN_KEY, value);
    set({ token: value });
  },

  setRefreshToken: (value) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, value);
    set({ refreshToken: value });
  },

  setProfile: (user) => {
    set({ profile: user });
  },

  setLoading: (value) => {
    set({ loading: value });
  },

  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    set({ token: null, refreshToken: null });
  },

  clearProfile: () => {
    set({ profile: null });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    set({ token: null, refreshToken: null, profile: null });
  },

  // ========== Reset ==========
  reset: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    set({ token: null, refreshToken: null, profile: null, loading: false });
  },
}));
