import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLoggedInUser } from './lib/server/appwrite';

export async function middleware(request: NextRequest) {
  const { isAuthenticated, user } = await getLoggedInUser();

  console.log('User Existing: ', user);
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // console.log(user);
  console.log('Middleware test');

  const pathname = request.nextUrl.pathname;

  // Restrict /admin to superusers only
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
