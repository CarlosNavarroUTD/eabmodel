// src/app/api/github/repositories/route.ts
import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github/github.service';
import { AuthService } from '@/lib/auth/auth.service';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await AuthService.validateToken(token);
    const repositories = await GitHubService.getRepositories(user.id);

    return NextResponse.json({ repositories });
  } catch (error: any) {
    console.error('Repository fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}