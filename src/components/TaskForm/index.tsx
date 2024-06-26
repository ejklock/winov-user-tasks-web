import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import { taskValidationSchema } from '../../utils/validators'

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
      validationSchema={taskValidationSchema}
      onReset={resetForm}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.title}>
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
            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Descrição</FormLabel>
              <Input
                name='description'
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
                type='text'
              />
            </FormControl>
            <FormControl isInvalid={!!errors.due_date}>
              <FormLabel>Data de entrega</FormLabel>
              <Input
                name='due_date'
                type='datetime-local'
                onChange={handleChange}
                value={values.due_date}
              />
              <FormErrorMessage>{errors.due_date}</FormErrorMessage>
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
