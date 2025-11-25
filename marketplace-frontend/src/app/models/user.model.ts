export interface User {
  id: number;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  bonusBalance: number;
  firstName: string;
  lastName: string;
  createdAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}