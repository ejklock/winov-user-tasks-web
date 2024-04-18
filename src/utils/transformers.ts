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
    console.log(errorsToSet)

    return errorsToSet
  } else if (apiResponse?.message) {
    console.log(apiResponse)
    errorsToSet['message'] = apiResponse.message
    console.log(errorsToSet)
    return errorsToSet
  } else {
    return {} // Return an empty object if apiResponse does not have an errors property
  }
}
