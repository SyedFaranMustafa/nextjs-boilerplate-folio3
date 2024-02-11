import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type callbackURL = string | null

export async function SignOut(callbackURL: callbackURL) {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) })
  if (callbackURL) {
    if (typeof window !== 'undefined') {
      window.location.href = callbackURL
    } else {
      redirect(callbackURL)
    }
  }
}
