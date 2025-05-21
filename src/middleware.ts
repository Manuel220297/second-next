import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLoggedInUser } from './lib/server/appwrite';

export async function middleware(request: NextRequest) {
  const { isAuthenticated, user } = await getLoggedInUser();

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin') || pathname.startsWith('/users')) {
    console.log('This is admin page');
    const labels = user?.label || [];
    const isSuperUser = labels.includes('superuser');

    if (!isSuperUser) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/users/:path*'],
};
