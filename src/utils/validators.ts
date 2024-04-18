import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
})

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('A confirmação da senha é obrigatória'),
})
