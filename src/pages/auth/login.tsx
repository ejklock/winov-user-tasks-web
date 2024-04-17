import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Stack,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import CenterContainer from '../../components/CenterContainer'
import { PasswordField } from '../../components/PasswordField'
import { ApiResponse, AuthToken } from '../../hooks/api/api.types'
import useApi from '../../hooks/api/use-api'
import AuthContext from '../../store/auth/auth.context-provider'

export function Login() {
  const [authData, setAuthData] = useState<
    AuthToken | AuthToken[] | undefined
  >()
  const { globalLogInDispatch } = useContext(AuthContext)
  const { request } = useApi()

  const createAccountActions = () => {
    return <Link href='/register'>Criar uma conta</Link>
  }
  useEffect(() => {
    if (authData && 'access_token' in authData) {
      globalLogInDispatch({
        authToken: authData.access_token,
      })
    }
  }, [authData, globalLogInDispatch])
  return (
    <CenterContainer
      maxW='xl'
      headingText='Login'
      descriptionTextChildren={createAccountActions()}
    >
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg.surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            await request<ApiResponse<AuthToken>>(
              'POST',
              'auth/login',
              {
                email: values.email,
                password: values.password,
              },
              undefined,
              ({ data }) => {
                setAuthData(data)
              },
              (error) => {
                if (error.errors) {
                  const { errors } = error
                  const errorsToSet = {} as {
                    [key: string]: string
                  }

                  for (const field in errors) {
                    errorsToSet[field] = errors[field][0]
                  }

                  console.log(errorsToSet)
                  setErrors(errorsToSet)
                  setSubmitting(false)
                } else {
                  alert(error.message)
                }
              }
            )
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing='6'>
                <FormControl isInvalid={!!errors.email && !!touched.email}>
                  <FormLabel htmlFor='email'>Email</FormLabel>

                  <Input
                    id='email'
                    name='email'
                    type='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.password && !!touched.password}
                >
                  <PasswordField
                    onChange={handleChange}
                    min={8}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Stack spacing='6'>
                  <Button type='submit'>Login</Button>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </CenterContainer>
  )
}
