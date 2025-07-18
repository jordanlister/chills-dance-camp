import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, UserRole, LoginRequest, RegisterRequest, ChangePasswordRequest } from '../types';
import { apiService } from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        try {
          const result = await apiService.login(credentials);
          localStorage.setItem('accessToken', result.accessToken);
          set({ 
            user: result.user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Login failed',
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (userData: RegisterRequest) => {
        set({ isLoading: true, error: null });
        try {
          const result = await apiService.register(userData);
          localStorage.setItem('accessToken', result.accessToken);
          set({ 
            user: result.user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Registration failed',
            isLoading: false 
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await apiService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          localStorage.removeItem('accessToken');
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null 
          });
        }
      },

      changePassword: async (data: ChangePasswordRequest) => {
        set({ isLoading: true, error: null });
        try {
          await apiService.changePassword(data);
          set({ isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || 'Password change failed',
            isLoading: false 
          });
          throw error;
        }
      },

      loadUser: async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
          return;
        }

        set({ isLoading: true });
        try {
          const user = await apiService.getProfile();
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          localStorage.removeItem('accessToken');
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },

      clearError: () => set({ error: null }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        // Don't persist isAuthenticated - let it be determined by token validity
      }),
    }
  )
);

// Selectors
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectIsLoading = (state: AuthState) => state.isLoading;
export const selectError = (state: AuthState) => state.error;
export const selectUserRole = (state: AuthState) => state.user?.role;
export const selectIsStudent = (state: AuthState) => state.user?.role === UserRole.STUDENT;
export const selectIsTeacher = (state: AuthState) => state.user?.role === UserRole.TEACHER;
export const selectIsVideographer = (state: AuthState) => state.user?.role === UserRole.VIDEOGRAPHER;
export const selectIsAdmin = (state: AuthState) => state.user?.role === UserRole.ADMIN;