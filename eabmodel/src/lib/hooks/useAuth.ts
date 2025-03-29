
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router' to 'next/navigation'

interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  position?: string;
  image?: string;
  role: string;
}

// This should be defined as a custom hook function
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Place useEffect hook inside the custom hook function
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // First, try to get token from cookie via API endpoint
      const response = await fetch('/api/auth/verify', {
        credentials: 'include', // Important for sending cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setLoading(false);
        return;
      }

      // Fallback to localStorage token if cookie verification fails
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      const localResponse = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (localResponse.ok) {
        const data = await localResponse.json();
        setUser(data.user);
      } else {
        // Clear tokens if verification fails
        localStorage.removeItem('token');
        document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    } catch {
      // Clear tokens on any error
      localStorage.removeItem('token');
      document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for setting cookies
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    // Store token in both localStorage and cookie
    localStorage.setItem('token', data.token);
    setUser(data.user);
    
    // Redirect to dashboard
    router.push('/dashboard');

    return data.user;
  };

  const register = async (userData: {
    email: string;
    password: string;
    name?: string;
    phone?: string;
    position?: string;
  }) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for setting cookies
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    // Store token in both localStorage and cookie
    localStorage.setItem('token', data.token);
    setUser(data.user);
    
    // Redirect to dashboard or profile setup
    router.push('/dashboard');

    return data.user;
  };

  const logout = async () => {
    try {
      // Optional: Call logout API to invalidate server-side session
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      console.error('Logout failed');
    } finally {
      // Clear tokens
      localStorage.removeItem('token');
      document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // Clear user state and redirect
      setUser(null);
      router.push('/login');
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
  };
}