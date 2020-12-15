import { object, string, ref } from 'yup'
import { IFormValues } from './LoginAndRegister'

export const validationSchema = () =>
  object().shape<IFormValues>({
    name: string().min(2, 'Your name is too short').required('Fill this field'),
    email: string().email('Invalid Email').required('Fill this field'),
    password: string()
      .min(8, 'Your password is too short')
      .matches(/[a-z]/, 'At least one lowercase character')
      .matches(/[A-Z]/, 'At least one uppercase character')
      .matches(/[1-9]/, 'At least one number')
      .required('Fill this field'),
    passwordConfirm: string()
      .oneOf([ref('password')], 'Passwords must match')
      .required(),
  })
