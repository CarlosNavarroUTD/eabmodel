'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RegisterPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
      phone: '',
      position: ''
    });
    const [error, setError] = useState('');
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
      setLoading(true);
  
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || 'Error al registrarse');
        }
  
        // Guardar el token en localStorage
        localStorage.setItem('token', data.token);
        document.cookie = `token=${data.token}; path=/`;
        
        // Redirigir al dashboard o página principal
        router.push('/');
      } catch (err: unknown) {
        if (err instanceof Error) {
        setError(err.message);
        } else {
        setError('An unknown error occurred');
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
              Registro
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
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
                  className="bg-background/50 border-secondary text-white form-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-background/50 border-secondary text-white form-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background/50 border-secondary text-white form-input"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  name="position"
                  placeholder="Cargo"
                  value={formData.position}
                  onChange={handleChange}
                  className="bg-background/50 border-secondary text-white form-input"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </Button>
            </form>
  
            <div className="mt-4 text-center text-sm text-gray-300">
              ¿Ya tienes una cuenta?{' '}
              <Link 
                href="/login"
                className="text-primary hover:underline"
              >
                Inicia sesión aquí
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  };
  
  export default RegisterPage;