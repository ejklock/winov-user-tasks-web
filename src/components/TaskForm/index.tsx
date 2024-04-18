import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'
import { Formik } from 'formik'

export type TaskFormProps = {
  readonly initialValues: Record<string, unknown>
  readonly handleSubmit: (e: any) => void
  readonly resetForm: () => void
}

export default function TaskForm({
  initialValues,
  resetForm,
  handleSubmit,
}: TaskFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onReset={resetForm}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Título</FormLabel>
              <Input
                name='title'
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input
                name='description'
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
                type='text'
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            <Button type='submit' colorScheme='green'>
              Criar
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  )
}
