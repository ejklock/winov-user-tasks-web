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
  Stack,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import CenterContainer from '../../components/CenterContainer'
import useAuth from '../../hooks/auth/use-auth'
import { registerValidationSchema } from '../../utils/validators'

export const Register = () => {
  const { register, errors } = useAuth()

  return (
    <CenterContainer maxW='xl' headingText='Cadastre-se'>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg.surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            message: '',
          }}
          validationSchema={registerValidationSchema}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            setSubmitting(true)
            await register(values)
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
            isSubmitting,
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
                <FormControl isInvalid={!!errors.name && !!touched.name}>
                  <FormLabel htmlFor='name'>Nome</FormLabel>

                  <Input
                    id='name'
                    name='name'
                    placeholder='Digite seu nome'
                    onChange={handleChange}
                  />
                </FormControl>

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
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.password_confirmation &&
                    !!touched.password_confirmation
                  }
                >
                  <FormControl
                    isInvalid={!!errors.password && !!touched.password}
                  >
                    <FormLabel htmlFor='password'>
                      Confirmação da senha
                    </FormLabel>
                    <Input
                      type='password'
                      id='password_confirmation'
                      name='password_confirmation'
                      placeholder='Confirme sua senha'
                      min={8}
                      onChange={handleChange}
                      value={values.password_confirmation}
                    ></Input>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <FormErrorMessage>
                    {errors.password_confirmation}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing='6'>
                  <Button isDisabled={isSubmitting} type='submit'>
                    Cadastrar
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
