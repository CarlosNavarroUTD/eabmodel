'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

//import { useAuth } from '@/lib/hooks/useAuth';
//const { checkAuth } = useAuth();

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      setLoading(true);
    
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important: this allows cookies to be set
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.error || 'Error al iniciar sesión');
        }
    
        // Store token in both localStorage and set cookie manually as backup
        localStorage.setItem('token', data.token);
        
        // Asegúrate de establecer la cookie en el cliente también
        document.cookie = `auth-token=${data.token}; path=/; max-age=604800; SameSite=Strict`;
        
        setSuccess('Inicio de sesión exitoso. Redirigiendo...');
        


        // Redirección inmediata al dashboard
        router.push('/dashboard');
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error durante el login:', err);
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-background/50 border-secondary">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">
              Iniciar Sesión
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default" className="mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background/50 border-secondary text-white form-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-black border-secondary text-white form-input"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
  
            <div className="mt-4 text-center text-sm text-gray-300">
              ¿No tienes una cuenta?{' '}
              <Link 
                href="/register"
                className="text-primary hover:underline"
              >
                Regístrate aquí
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  };
  
  export default LoginPage;