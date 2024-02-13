'use server'
import { cookies } from 'next/headers'
import { decrypt, encrypt } from './utils'
import { NextRequest, NextResponse } from 'next/server'
export async function getSession(): Promise<any> {
  const session = cookies().get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function refreshSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  if (!session) {
    if (request.nextUrl.pathname === '/login') {
      return
    }

    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 50 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })

  // TODO: check if the cookie is not expired refresh the token

  return res
}

export async function destroySession() {
  cookies().set('session', '', { expires: new Date(0) })
}

export async function updateSession(session: any) {
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encrypt(session),
    httpOnly: true,
    expires: session.expires,
  })
  return res
}
