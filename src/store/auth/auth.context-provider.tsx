import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { useNavigate } from 'react-router-dom'

// Project dependencies
import { AuthActionEnum } from './auth.actions'
import authReducer, { AuthState, defaultAuthState } from './auth.reducer'

type AuthProviderProps = {
  children: React.ReactElement
}

export type UserData = {
  authToken: string
  userId: string
  name: string
  email: string
}

export interface AuthContext {
  authState: AuthState
  globalLogInDispatch: (props: UserData) => void
  globalLogOutDispatch: () => void
}

// Auth context
const AuthContext = createContext<AuthContext>({
  authState: defaultAuthState,
  globalLogInDispatch: () => {},
  globalLogOutDispatch: () => {},
})

export const AuthContextProvider = (props: AuthProviderProps) => {
  const { children } = props

  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState)
  const navigate = useNavigate()

  // Check if user detail is persisted, mostly catering for refreshing of the browser
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData: UserData = JSON.parse(user)
      authDispatch({ type: AuthActionEnum.LOG_IN, payload: userData })
    }
  }, [])

  const globalLogInDispatch = useCallback(
    (props: UserData) => {
      const { authToken, email, name, userId } = props
      authDispatch({
        type: AuthActionEnum.LOG_IN,
        payload: {
          authToken,
          userId,
          name,
          email,
        },
      })
      navigate('/tasks')
    },
    [navigate]
  )

  const globalLogOutDispatch = useCallback(() => {
    authDispatch({ type: AuthActionEnum.LOG_OUT, payload: null })
    navigate('/auth/login')
  }, [navigate])

  // context values to be passed down to children
  const ctx = useMemo(
    () => ({
      authState,
      globalLogInDispatch,
      globalLogOutDispatch,
    }),
    [authState, globalLogInDispatch, globalLogOutDispatch]
  )

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>
}

export default AuthContext
