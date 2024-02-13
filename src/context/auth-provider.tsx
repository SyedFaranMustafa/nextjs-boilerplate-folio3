'use client'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

import { getSession } from '../lib/auth'

// Define the shape of the session data
interface SessionData {
  user: {
    id: number
    username: string
  }
  token: string
}

// Define the shape of the authentication state
interface AuthState {
  loading: boolean
  session: SessionData | null
  error: Error | null
  updateSession: (newSession: SessionData) => void
}

// Create the initial authentication state
const initialAuthState: AuthState = {
  loading: false,
  session: null,
  error: null,
  updateSession: (newSession: SessionData) => {},
}

// Create the authentication context

// AuthProvider component
const AuthContext = createContext(initialAuthState)
export function AuthProvider(props: { children: ReactNode }): React.ReactNode {
  const [loading, setLoading] = useState<boolean>(false)
  const [session, setSession] = useState<SessionData | null>(
    initialAuthState.session ?? null
  )
  const [error, setError] = useState<Error | null>(null)

  // Function to update session
  const updateSession = (newSession: SessionData) => {
    setSession(newSession)
  }

  useEffect(() => {
    // Simulating async session loading
    setLoading(true)

    if (session) {
      setLoading(false)
      return
    }

    // Fetch the session
    getSession()
      .then((session) => {
        setSession(session)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Handle loading state
  // if (loading) {
  //   return <span>Loading...</span>
  // }

  // Render AuthContext.Provider with children
  return (
    <AuthContext.Provider value={{ loading, session, error, updateSession }}>
      {props.children}
    </AuthContext.Provider>
  )
}

// Custom hook to access the authentication context
export const useSession = (): AuthState => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('useSession must be used within an AuthProvider')
  }
  return authContext
}
