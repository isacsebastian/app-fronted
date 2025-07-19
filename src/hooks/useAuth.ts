// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';

export const useAuth = () => {
  const {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshAuth,
    updateProfile,
    clearError,
  } = useUserStore();

  const isAuthenticated = !!user && !!useUserStore.getState().accessToken;

  // Auto-refresh token cuando la app se carga
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (token && refreshToken && !user) {
      refreshAuth().catch(() => {
        logout(); // Si falla, logout automático
      });
    }
  }, [user, refreshAuth, logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshAuth,
    updateProfile,
    clearError,
  };
};