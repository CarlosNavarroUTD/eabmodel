// src/app/api/profile/route.ts
import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/auth.service';
import { prisma } from '@/lib/prisma/client';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await AuthService.validateToken(token);
    
    // Obtener el usuario con la información de GitHub
    const userWithGithub = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        githubAccount: {
          include: {
            repositories: true
          }
        }
      }
    });

    if (!userWithGithub) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Estructurar la respuesta
    return NextResponse.json({
      user: {
        id: userWithGithub.id,
        email: userWithGithub.email,
        name: userWithGithub.name || '',
        phone: userWithGithub.phone || '',
        position: userWithGithub.position || '',
        image: userWithGithub.image || ''
      },
      githubAccount: userWithGithub.githubAccount || null
    });
  } catch (error: unknown) {
    console.error('Repository fetch error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
  }
}