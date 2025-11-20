// 1. Corrige el middleware - middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './lib/auth/auth.service';

const protectedRoutes = [
  {
    path: '/register',
    allowedRoles: ['ADMIN']
  },
  {
    path: '/dashboard', 
    allowedRoles: ['USER', 'ADMIN']
  }
];

export async function middleware(request: NextRequest) {
  console.log('Middleware intercepted request:', {
    path: request.nextUrl.pathname
  });

  // Extracción del token - Priorizar cookie
  const token = 
    request.cookies.get('auth-token')?.value || 
    request.headers.get('Authorization')?.split('Bearer ')[1];
  
  console.log('Extracted token:', token ? 'Token present' : 'No token found');

  // Si no hay token y la ruta está protegida, redirigir al login
  if (!token) {
    const isProtectedRoute = protectedRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route.path)
    );
    
    if (isProtectedRoute) {
      console.log('Redirecting to login due to missing token');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    return NextResponse.next();
  }

  try {
    // Validar el token y obtener la información del usuario
    const user = await AuthService.validateToken(token);
    
    console.log('Token validation successful:', {
      userId: user.id,
      userRole: user.role
    });

    // Verificar si el usuario tiene acceso a esta ruta
    const currentRoute = protectedRoutes.find(route => 
      request.nextUrl.pathname.startsWith(route.path)
    );
    
    if (currentRoute && !currentRoute.allowedRoles.includes(user.role)) {
      console.log('Access denied due to insufficient role');
      return NextResponse.redirect(new URL('/access-denied', request.url));
    }
    
    // Si todo está bien, permitir el acceso
    return NextResponse.next();
  } catch (error) {
    console.error('Token validation error:', error);

    // Si el token es inválido, eliminar la cookie y redirigir al login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }
}

// Asegúrate de que el matcher incluya todas las rutas protegidas
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/register',
  ]
};
