import axios, { AxiosError } from 'axios'
import { useCallback, useContext, useState } from 'react'
import AuthContext from '../../store/auth/auth.context-provider'
import { ApiResponse, RequestParams } from './api.types'

const BASE_URL = '/api'

const useApi = <T>() => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiResponse<T>>()
  const { authState, globalLogOutDispatch } = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  })

  const request = useCallback(
    async <T>(
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS',
      endpoint: string,
      body: Record<string, unknown> | undefined,
      params: RequestParams | undefined,
      handleSuccessResponse: (data: T) => void,
      handleErrorResponse: (error: any) => void
    ) => {
      setLoading(true)
      setError(null)

      if (authState.isLoggedIn) {
        if (!params?.headers) {
          params = {
            headers: { Authorization: `Bearer ${authState.authToken}` },
          }
        } else {
          params.headers['Authorization'] = `Bearer ${authState.authToken}`
        }
      }

      axiosInstance
        .request<ApiResponse<T>>({
          url: endpoint,
          method,
          headers: params?.headers,
          data: body,
        })
        .then(({ data }) => {
          handleSuccessResponse(data as T)
        })
        .catch(
          (error: AxiosError) =>
            (error.response?.status === 401 && globalLogOutDispatch()) ||
            (handleErrorResponse
              ? handleErrorResponse(error.response?.data)
              : setError(error.response?.data as any))
        )
        .finally(() => setLoading(false))
    },

    [
      authState.isLoggedIn,
      authState.authToken,
      globalLogOutDispatch,
      axiosInstance,
    ]
  )

  return {
    loading: loading,
    error: error,
    request: request,
    setError: setError,
  }
}

export default useApi
