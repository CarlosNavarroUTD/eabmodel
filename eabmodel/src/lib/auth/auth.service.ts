
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { prisma } from '../prisma/client';
import { UserRegistrationData, UserLoginData } from './types';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '24h';

export class AuthService {
  static async register(data: UserRegistrationData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: data.role || 'USER' // Por defecto, asignar rol USER
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        position: true,
        image: true,
        role: true
      }
    });

    const token = sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

    return { user, token };
  }

  static async login(data: UserLoginData) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await compare(data.password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        position: user.position,
        image: user.image,
        role: user.role
      },
      token
    };
  }

  static async validateToken(token: string) {
    try {
      const decoded = verify(token, JWT_SECRET) as { userId: string, role: string };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          position: true,
          image: true,
          role: true
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch {
      throw new Error('Invalid token');
    }
  }

  // Métodos adicionales para gestión de sesión

  // Verificar token desde cookie o encabezado de autorización
  static async verifySession(req: NextRequest) {
    try {
      // Intentar obtener token de cookie
      const cookieStore = await cookies();
      const tokenFromCookie = cookieStore.get('auth-token')?.value;

      // Intentar obtener token del encabezado de autorización
      const authHeader = req.headers.get('authorization');
      const tokenFromHeader = authHeader?.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : null;

      const token = tokenFromCookie || tokenFromHeader;

      if (!token) {
        return { authenticated: false, user: null };
      }

      const user = await this.validateToken(token);
      return { authenticated: true, user };
    } catch {
      return { authenticated: false, user: null };
    }
  }

  // Establecer token en cookie para autenticación server-side
  static setAuthCookie(token: string, res: NextResponse) {
    res.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 horas en segundos
    });
    
    return res;
  }

  // Limpiar cookie de autenticación al cerrar sesión
  static clearAuthCookie(res: NextResponse) {
    res.cookies.set({
      name: 'auth-token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0
    });
    
    return res;
  }

  // Proteger rutas de la API basado en roles
  static async requireAuth(req: NextRequest, allowedRoles: string[] = []) {
    const { authenticated, user } = await this.verifySession(req);
    
    if (!authenticated || !user) {
      return { authenticated: false, user: null };
    }
    
    // Si hay roles permitidos especificados, verificar que el usuario tenga uno de ellos
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return { authenticated: true, authorized: false, user };
    }
    
    return { authenticated: true, authorized: true, user };
  }
}