import {
  Alert,
  AlertIcon,
  AlertTitle,
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
import CenterContainer from '../../components/CenterContainer'
import useAuth from '../../hooks/auth/use-auth'
import { loginValidationSchema } from '../../utils/validators'

export function Login() {
  const { login, loading, errors } = useAuth()

  const createAccountActions = () => {
    return <Link href='/auth/register'>Criar uma conta</Link>
  }

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
          validationSchema={loginValidationSchema}
          initialValues={{ email: '', password: '', message: '' }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            setSubmitting(true)
            await login(values.email, values.password)
            setSubmitting(false)
            if (errors) {
              setErrors(errors)
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
              <Stack spacing='6'>
                {errors.message && touched.message && (
                  <>
                    <Alert status='error'>
                      <AlertIcon />
                      <AlertTitle>{errors.message}</AlertTitle>
                    </Alert>
                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                  </>
                )}

                <FormControl isInvalid={!!errors.email && !!touched.email}>
                  <FormLabel htmlFor='email'>Email</FormLabel>

                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Digite seu email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.password && !!touched.password}
                >
                  <FormLabel htmlFor='password'>Senha</FormLabel>
                  <Input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Digite sua senha'
                    min={8}
                    onChange={handleChange}
                    value={values.password}
                  ></Input>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Stack spacing='6'>
                  <Button isDisabled={loading} type='submit'>
                    Login
                  </Button>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </CenterContainer>
  )
}
