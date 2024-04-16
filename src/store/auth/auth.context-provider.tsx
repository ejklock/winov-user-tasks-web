import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { useNavigate } from 'react-router-dom'

import authReducer, { AuthState, defaultAuthState } from './auth.reducer'
import {
  AuthActionEnum,
  AuthProviderProps,
  DecodedToken,
  UserData,
} from './auth.types'

export interface AuthContext {
  authState: AuthState
  globalLogInDispatch: (props: UserData) => void
  globalLogOutDispatch: () => void
}

const AuthContext = createContext<AuthContext>({
  authState: defaultAuthState,
  globalLogInDispatch: () => {},
  globalLogOutDispatch: () => {},
})

const decodeToken = (token: string): DecodedToken => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  const decodedToken = JSON.parse(window.atob(base64))
  return decodedToken as DecodedToken
}
export const AuthContextProvider = (props: AuthProviderProps) => {
  const { children } = props

  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData: UserData = JSON.parse(user)
      globalLogInDispatch(userData)
    }
  }, [])

  const globalLogInDispatch = useCallback(
    (props: UserData) => {
      const { authToken } = props
      const decoded = decodeToken(authToken)
      authDispatch({
        type: AuthActionEnum.LOG_IN,
        payload: {
          authToken,
          sub: decoded.sub,
          name: decoded.name,
          email: decoded.email,
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
