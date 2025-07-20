// src/stores/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/user';
import { apiClient } from '../lib/utils';
import { fetchGraphQL } from '../graphql/client';
import { UPDATE_USERS_PROFILE } from '../graphql/mutations/user';

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  isHydrating: boolean;
}

interface UserActions {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  updateProfile: (id: string, data: Partial<User>) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  updateUserProfile: (profileId: string, data: any) => Promise<void>;
}

let globalSet: any;

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => {
      globalSet = set;
      return {
        // State
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoading: false,
        error: null,
        isHydrating: true,
        // Actions
        login: async (credentials: LoginRequest) => {
          set({ isLoading: true, error: null });
          try {
            const response: AuthResponse = await apiClient.login(credentials);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            set({
              user: response.user,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              isLoading: false,
            });
            console.log('Login state:', {
              user: response.user,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Error de login',
              isLoading: false,
            });
            throw error;
          }
        },
        register: async (userData: RegisterRequest) => {
          set({ isLoading: true, error: null });
          try {
            const response: AuthResponse = await apiClient.register(userData);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            set({
              user: response.user,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              isLoading: false,
            });
          } catch (error: any) {
            let errorMsg = 'Error de registro';
            if (typeof error?.message === 'string') {
              if (error.message.includes('Unique constraint failed') || error.message.includes('P2002')) {
                errorMsg = 'El correo electrónico ya está registrado.';
              } else if (error.message.includes('Network')) {
                errorMsg = 'No se pudo conectar con el servidor.';
              } else {
                errorMsg = error.message;
              }
            }
            set({
              error: errorMsg,
              isLoading: false,
            });
            throw error;
          }
        },
        logout: () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            error: null,
          });
        },
        refreshAuth: async () => {
          const { refreshToken } = get();
          if (!refreshToken) return;
          try {
            const response: AuthResponse = await apiClient.refreshToken({
              refreshToken,
            });
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            set({
              user: response.user,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            });
            console.log('RefreshAuth state:', {
              user: response.user,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            });
          } catch (error) {
            get().logout();
            throw error;
          }
        },
        updateProfile: async (id: string, data: Partial<User>) => {
          set({ isLoading: true, error: null });
          try {
            const updatedUser = await apiClient.updateUser(id, data);
            set({
              user: updatedUser,
              isLoading: false,
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Error al actualizar',
              isLoading: false,
            });
            throw error;
          }
        },
        updateUserProfile: async (profileId: string, data: any) => {
          set({ isLoading: true, error: null });
          try {
            const variables = { id: profileId, input: data };
            const result = await fetchGraphQL(UPDATE_USERS_PROFILE, variables);
            const updatedProfile = result.updateUsersProfile;
            set((state) => ({
              user: state.user ? { ...state.user, profile: updatedProfile } : null,
              isLoading: false,
            }));
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Error al actualizar perfil',
              isLoading: false,
            });
            throw error;
          }
        },
        clearError: () => set({ error: null }),
        setLoading: (loading: boolean) => set({ isLoading: loading }),
      };
    },
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => () => {
        globalSet?.({ isHydrating: false });
      },
    }
  )
);