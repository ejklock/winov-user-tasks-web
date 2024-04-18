export type ValidationError = {
  field: string
  message: string
  [key: number]: string // Add index signature for numeric indices
}

export type ValidationErrors = {
  errors: ValidationError[]
  message?: string
}
export type ApiResponseFormat = {
  success: boolean
  message?: string
  data?: any
}

export const convertApiValidationErrorsToFormErrors = (
  apiResponse: ValidationErrors | ApiResponseFormat
): { [key: string]: string } => {
  const errorsToSet = {} as {
    [key: string]: string
  }
  if ('errors' in apiResponse) {
    const { errors } = apiResponse

    for (const field in errors) {
      errorsToSet[field] = errors[field][0]
    }

    return errorsToSet
  } else if (apiResponse?.message) {
    errorsToSet['message'] = apiResponse.message

    return errorsToSet
  } else {
    return {}
  }
}

export const transformDateStringToBrazilianFormat = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    hour12: false,
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}
