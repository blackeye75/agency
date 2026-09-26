import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Keeps the admin's Supabase session fresh and sends signed-out visitors of
// /admin to the login page. Real authorisation happens in the database (RLS)
// and in the admin API; this is only the optimistic check.
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  let response = NextResponse.next({ request })
  if (!url || !key) return response

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(list, headers) {
        list.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v))
      },
    },
  })
  const { data } = await supabase.auth.getClaims()
  const signedIn = Boolean(data?.claims?.sub)
  const path = request.nextUrl.pathname

  // The login page and the email-link landing page must stay reachable signed out.
  const open = path === '/admin/login' || path === '/admin/auth'
  if (path.startsWith('/admin') && !open && !signedIn) {
    const login = request.nextUrl.clone()
    login.pathname = '/admin/login'
    login.searchParams.set('next', path)
    return NextResponse.redirect(login)
  }
  response.headers.set('Cache-Control', 'private, no-store')
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
