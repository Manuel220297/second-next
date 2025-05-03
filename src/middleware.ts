import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLoggedInUser } from './lib/server/appwrite';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const user = await getLoggedInUser();

  console.log('User Existing: ', user);
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // console.log(user);
  console.log('Middleware test');
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/'],
};
