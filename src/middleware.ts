import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // Admin routes - only accessible by admin users
    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    // Dashboard routes - require authentication
    if (pathname.startsWith('/dashboard')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
      
      // If admin user is on dashboard, redirect to admin panel
      if (token.role === 'ADMIN' && pathname === '/dashboard') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Public routes that don't require authentication
        if (pathname.startsWith('/auth') || pathname === '/') {
          return true
        }
        
        // All other routes require authentication
        return !!token
      }
    }
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}


