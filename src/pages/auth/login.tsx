import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import CenterContainer from '../../components/CenterContainer'
import { PasswordField } from '../../components/PasswordField'
import LoginService from '../../services/login-service'

export function Login() {
  const loginService = new LoginService()
  return (
    <CenterContainer headingText='Login'>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg.surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Stack spacing='6'>
          <Stack spacing='5'>
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={(values) => {
                const errors = {
                  email: '',
                  password: '',
                }

                if (!values.email) {
                  errors.email = 'Email is required'
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address'
                }

                if (!values.password) {
                  errors.password = 'Password is required'
                }

                return errors
              }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                const { errors } = await loginService.login({
                  email: values.email,
                  password: values.password,
                })
                if (errors) {
                  setErrors(errors)
                } else {
                  setSubmitting(false)
                }
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
                  <FormControl>
                    <FormLabel htmlFor='email'>Email</FormLabel>

                    <Input
                      id='email'
                      name='email'
                      type='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                  </FormControl>
                  <PasswordField
                    isRequired={false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                  <Stack spacing='6'>
                    <Button type='submit'>Login</Button>
                    <HStack>
                      <Divider />
                      <Divider />
                    </HStack>
                  </Stack>
                </form>
              )}
            </Formik>
          </Stack>
        </Stack>
      </Box>
    </CenterContainer>
  )
}
