export enum AuthActionEnum {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export type DecodedToken = {
  exp: number
  iat: number
  sub: string
  email: string
  name: string
}
export type AuthAction =
  | {
      type: AuthActionEnum.LOG_IN
      payload: {
        authToken: string
        sub?: string
        email?: string
        name?: string
      }
    }
  | {
      type: AuthActionEnum.LOG_OUT
      payload: null
    }

export type AuthProviderProps = {
  children: React.ReactElement
}

export type UserData = {
  authToken: string
  sub?: string
  name?: string
  email?: string
}
