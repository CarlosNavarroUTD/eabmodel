// src/app/api/github/repositories/route.ts
import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github/github.service';
import { AuthService } from '@/lib/auth/auth.service';

// Export to make the route dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await AuthService.validateToken(token);
    const repositories = await GitHubService.getRepositories(user.id);

    return NextResponse.json({ repositories });
  } catch (error: unknown) {
    console.error('Repository fetch error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
  }
}