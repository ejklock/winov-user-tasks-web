import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../store/auth/auth.context-provider'
import { convertApiValidationErrorsToFormErrors } from '../../utils/transformers'
import { ApiResponse, AuthToken } from '../api/api.types'
import useApi from '../api/use-api'

type RegisterInput = {
  name: string
  email: string
  password: string
  password_confirmation: string
}
const useAuth = () => {
  const [authData, setAuthData] = useState<
    AuthToken | AuthToken[] | undefined
  >()
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState(
    {} as { [key: string]: string } | undefined
  )
  const { globalLogInDispatch, globalLogOutDispatch } = useContext(AuthContext)
  const { request } = useApi()
  useEffect(() => {
    if (authData && 'access_token' in authData) {
      globalLogInDispatch({
        authToken: authData.access_token,
      })
    }
  }, [authData, globalLogInDispatch])
  const login = async (email: string, password: string) => {
    setLoading(true)
    await request<ApiResponse<AuthToken>>(
      'POST',
      'auth/login',
      {
        email,
        password,
      },
      undefined,
      ({ data }) => {
        setAuthData(data)
        setLoading(false)
      },
      (error) => {
        setErrors(convertApiValidationErrorsToFormErrors(error))
        setLoading(false)
      }
    )
  }

  const register = async (registerInput: RegisterInput) => {
    setLoading(true)
    await request<ApiResponse<AuthToken>>(
      'POST',
      'auth/register',
      {
        ...registerInput,
      },
      undefined,
      ({ data }) => {
        setAuthData(data)
        setLoading(false)
      },
      (error) => {
        setErrors(convertApiValidationErrorsToFormErrors(error))
        setLoading(false)
      }
    )
  }

  const logout = () => {
    globalLogOutDispatch()
  }

  return {
    login,
    loading,
    globalLogOutDispatch,
    register,
    logout,
    errors,
    setErrors,
  }
}

export default useAuth
