import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
 
  // If the user is not logged in and trying to access a protected route,
  // redirect them to the login page
  if (!session) {
    if (request.nextUrl.pathname !== '/login' && 
        request.nextUrl.pathname !== '/signup' && 
        request.nextUrl.pathname !== '/forgot-password' &&
        !request.nextUrl.pathname.startsWith('/_next') &&
        !request.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
 
  // If the user is logged in and trying to access auth pages,
  // redirect them to the home page
  if (session) {
    if (request.nextUrl.pathname === '/login' || 
        request.nextUrl.pathname === '/signup' || 
        request.nextUrl.pathname === '/forgot-password') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets
     */
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
}
