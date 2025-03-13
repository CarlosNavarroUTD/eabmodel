import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github/github.service';
import { AuthService } from '@/lib/auth/auth.service';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await AuthService.validateToken(token);
    const result = await GitHubService.linkAccount(code, user.id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}