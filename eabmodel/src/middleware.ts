import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './lib/auth/auth.service';

// Define las rutas protegidas y los roles permitidos
const protectedRoutes = [
  {
    path: '/register', // Solo administradores pueden acceder a la página de registro
    allowedRoles: ['ADMIN']
  },
  {
    path: '/dashboard', // Solo usuarios autenticados (cualquier rol) pueden acceder al dashboard
    allowedRoles: ['USER', 'ADMIN']
  }
  // Puedes añadir más rutas según sea necesario
];

export async function middleware(request: NextRequest) {
  // Obtener el token del encabezado o cookie
  const token = request.cookies.get('auth-token')?.value || request.headers.get('Authorization')?.split('Bearer ')[1];
  
  // Si no hay token y la ruta está protegida, redirigir al login
  if (!token) {
    // Verificar si la ruta actual está en la lista de rutas protegidas
    const isProtectedRoute = protectedRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route.path)
    );
    
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    return NextResponse.next();
  }

  try {
    // Validar el token y obtener la información del usuario
    const user = await AuthService.validateToken(token);
    
    // Verificar si el usuario tiene acceso a esta ruta
    const currentRoute = protectedRoutes.find(route => 
      request.nextUrl.pathname.startsWith(route.path)
    );
    
    if (currentRoute && !currentRoute.allowedRoles.includes(user.role)) {
      // Si el usuario no tiene el rol adecuado, redirigir a una página de acceso denegado
      return NextResponse.redirect(new URL('/access-denied', request.url));
    }
    
    // Si todo está bien, permitir el acceso
    return NextResponse.next();
  } catch {
    // Si el token es inválido, eliminar la cookie y redirigir al login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    '/dashboard/:path*', 
    // Puedes añadir más rutas aquí
  ]
};