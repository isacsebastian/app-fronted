// src/types/user.ts
export const UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  SELLER: 'SELLER',
  FREELANCER: 'FREELANCER',
  CUSTOMER: 'CUSTOMER'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const UserType = {
  NATURAL_PERSON: 'NATURAL_PERSON',
  LEGAL_ENTITY: 'LEGAL_ENTITY'
} as const;

export type UserType = typeof UserType[keyof typeof UserType];

export const DocumentType = {
  CEDULA: 'CEDULA',
  RUC: 'RUC',
  PASSPORT: 'PASSPORT'
} as const;

export type DocumentType = typeof DocumentType[keyof typeof DocumentType];

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  emailVerifiedAt?: string;
  lastLoginAt?: string;
  loginAttempts: number;
  lockedUntil?: string;
  profile?: UserProfile;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  isActive?: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  secondaryPhone?: string;
  documentType?: DocumentType;
  documentNumber?: string;
  userType: UserType;
  companyName?: string;
  taxId?: string;
  dateOfBirth?: string;
  gender?: string;
  avatar?: string;
  preferredLanguage: string;
  timezone: string;
  acceptsMarketing: boolean;
  acceptsSms: boolean;
  createdAt: string;
  updatedAt: string;
}

// DTOs para requests
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  secondaryPhone?: string;
  documentType?: DocumentType;
  documentNumber?: string;
  userType?: UserType;
  companyName?: string;
  taxId?: string;
  dateOfBirth?: string;
  gender?: string;
  preferredLanguage?: string;
  timezone?: string;
  acceptsMarketing?: boolean;
  acceptsSms?: boolean;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Response types
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}