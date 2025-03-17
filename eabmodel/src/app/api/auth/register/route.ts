import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/auth.service';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await AuthService.register(data);
    return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
  }
}
