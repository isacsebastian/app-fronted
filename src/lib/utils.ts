// src/lib/utils.ts
import type { LoginRequest, RegisterRequest, RefreshTokenRequest, AuthResponse, User } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Obtener token del localStorage
    const token = localStorage.getItem('accessToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // AUTH METHODS
  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async registerAdmin(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register-admin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // USER METHODS
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async getUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  async updateUserProfile(profileId: string, data: any): Promise<any> {
    return this.request(`/users-profile/${profileId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Función utilitaria para combinar clases de Tailwind (shadcn/ui)
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}