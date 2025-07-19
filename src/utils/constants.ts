// src/utils/constants.ts
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000/api/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN', 
  SELLER: 'SELLER',
  FREELANCER: 'FREELANCER',
  CUSTOMER: 'CUSTOMER',
} as const;

export const DOCUMENT_TYPES = {
  CEDULA: 'CEDULA',
  RUC: 'RUC', 
  PASSPORT: 'PASSPORT',
} as const;

export const USER_TYPES = {
  NATURAL_PERSON: 'NATURAL_PERSON',
  LEGAL_ENTITY: 'LEGAL_ENTITY',
} as const;