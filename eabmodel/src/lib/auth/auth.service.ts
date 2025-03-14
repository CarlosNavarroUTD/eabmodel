import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { prisma } from '../prisma/client';
import { UserRegistrationData, UserLoginData } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        position: true,
        image: true
      }
    });

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

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

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        position: user.position,
        image: user.image
      },
      token
    };
  }

  static async validateToken(token: string) {
    try {
      const decoded = verify(token, JWT_SECRET) as { userId: string };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          position: true,
          image: true
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

