import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth-options';

export async function requireAuth(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  return { session, user: session.user as { id: string; email: string; role: string; name?: string } };
}

export async function requireRole(request: Request, allowedRoles: string[]) {
  const authResult = await requireAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    );
  }

  return authResult;
}
