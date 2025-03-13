export interface UserRegistrationData {
    email: string;
    password: string;
    name?: string;
    phone?: string;
    position?: string;
    image?: string;
  }
  
  export interface UserLoginData {
    email: string;
    password: string;
  }