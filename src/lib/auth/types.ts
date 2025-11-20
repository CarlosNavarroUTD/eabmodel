export interface UserRegistrationData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  position?: string;
  image?: string;
  role?: 'USER' | 'ADMIN';
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  position?: string;
  image?: string;
  role: 'USER' | 'ADMIN';
}