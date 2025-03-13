import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/auth.service';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await AuthService.register(data);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
