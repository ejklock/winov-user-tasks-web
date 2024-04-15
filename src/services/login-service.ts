import axios, { AxiosError, AxiosInstance } from 'axios'

type LoginInput = {
  email: string
  password: string
}
type LoginTokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
}
type LoginResponse = {
  success: boolean
  data?: LoginTokenResponse
  errors?: Record<string, string[]>
}
export default class LoginService {
  API_BASE_URL = '/api'
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.API_BASE_URL,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  public async login(loginInput: LoginInput): Promise<LoginResponse> {
    try {
      const { data: response } = await this.axiosInstance.post<LoginResponse>(
        '/auth/login',
        {
          ...loginInput,
        }
      )
      return {
        ...response,
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          success: false,
          errors: error.response?.data.errors,
        }
      }
      throw error
    }
  }
}
