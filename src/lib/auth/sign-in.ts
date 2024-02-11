import { cookies } from 'next/headers'
import { login, getUserinfo } from '@services/auth'
import { encrypt } from './utils'
import { redirect } from 'next/navigation'

// let auth type credentials or social provider like google, facebook, etc, deafult is credentials
type AuthType = 'credentials' | 'google' | 'facebook' | 'github'

type callbackURL = string | null

type FormData = {
  get: (key: string) => string
}

export async function SignIn(
  type: AuthType,
  formData: FormData,
  callbackURL: callbackURL
) {
  // Verify credentials && get the user

  let user = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  let loginResponse: any
  try {
    loginResponse = await login(user)
  } catch (error) {
    console.log('error ', error)

    // If the user is not found, throw an error
    throw new Error('User not found')
  }

  // Get the user from the response
  user = {
    ...user,
    ...loginResponse.data,
  }

  // Create the session
  let expires = new Date(Date.now() + 10 * 1000)
  let session = await encrypt({
    user,
    expires,
  })

  // Save the session in a cookie
  cookies().set('session', session, { expires, httpOnly: true })

  let userResponse: any
  try {
    userResponse = await getUserinfo()
    console.log('userResponse', userResponse)
  } catch (error) {
    console.log('error ', error)
    // If the user data is not found, throw an error
    throw new Error('User Date not found')
  }

  user = {
    ...user,
    ...userResponse.data,
  }

  // Create the session
  expires = new Date(Date.now() + 10 * 1000)
  session = await encrypt({
    user,
    expires,
  })

  // Save the session in a cookie
  cookies().set('session', session, { expires, httpOnly: true })

  //   if the callbackURL is set, redirect to the callbackURL

  if (callbackURL) {
    if (typeof window !== 'undefined') {
      window.location.href = callbackURL
    } else {
      redirect(callbackURL)
    }
  }
}
