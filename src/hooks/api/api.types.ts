export type AuthToken = {
  access_token: string
  token_type: string
  expires_in: number
}
export type ApiPaginatedResponse<T> = {
  data: T[]
  links: PaginatedLinks
  meta: PaginatedMeta
}

export type ApiSingleResponse<T> = {
  success?: boolean
  data?: T
  errors?: Record<string, string[]>
}

export type ApiResponse<T> = ApiSingleResponse<T> | ApiPaginatedResponse<T>
export type PaginatedLinks = {
  first: string
  last: string
  prev: string
  next: string
}

export type PaginatedMeta = {
  current_page: number
  from: number
  last_page: number
}

export type RequestParams = {
  [key: string]: any
}
