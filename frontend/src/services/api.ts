import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AuthResult, LoginRequest, RegisterRequest, ApiResponse, ChangePasswordRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await this.client.post('/auth/refresh');
            const { accessToken } = response.data.data;
            
            localStorage.setItem('accessToken', accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            
            return this.client(originalRequest);
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResult> {
    const response = await this.client.post<ApiResponse<AuthResult>>('/auth/login', credentials);
    return response.data.data!;
  }

  async register(userData: RegisterRequest): Promise<AuthResult> {
    const response = await this.client.post<ApiResponse<AuthResult>>('/auth/register', userData);
    return response.data.data!;
  }

  async logout(): Promise<void> {
    await this.client.post('/auth/logout');
  }

  async refreshToken(): Promise<{ accessToken: string }> {
    const response = await this.client.post<ApiResponse<{ accessToken: string }>>('/auth/refresh');
    return response.data.data!;
  }

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await this.client.post('/auth/change-password', data);
  }

  async getProfile(): Promise<any> {
    const response = await this.client.get('/auth/me');
    return response.data.data;
  }

  // Classes endpoints
  async getClasses(): Promise<any[]> {
    const response = await this.client.get('/classes');
    return response.data.data;
  }

  async getClass(id: string): Promise<any> {
    const response = await this.client.get(`/classes/${id}`);
    return response.data.data;
  }

  // RSVP endpoints
  async getRSVPs(): Promise<any[]> {
    const response = await this.client.get('/rsvps');
    return response.data.data;
  }

  async createRSVP(classId: string): Promise<any> {
    const response = await this.client.post('/rsvps', { classId });
    return response.data.data;
  }

  async cancelRSVP(rsvpId: string): Promise<void> {
    await this.client.delete(`/rsvps/${rsvpId}`);
  }

  // Teachers endpoints
  async getTeachers(): Promise<any[]> {
    const response = await this.client.get('/teachers');
    return response.data.data;
  }

  async getTeacher(id: string): Promise<any> {
    const response = await this.client.get(`/teachers/${id}`);
    return response.data.data;
  }

  // Generic request method
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client(config);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;