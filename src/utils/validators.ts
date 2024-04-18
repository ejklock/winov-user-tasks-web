import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('A senha é obrigatória'),
})

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('A senha é obrigatória'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('A confirmação da senha é obrigatória'),
})

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().nullable(),
  due_date: Yup.date().required('A data de entrega é obrigatória'),
})
