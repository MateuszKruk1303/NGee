import { object, string, ref } from 'yup'
import { IFormValues } from './LoginAndRegister'

export const validationSchema = () =>
  object().shape<IFormValues>({
    name: string()
      .min(2, 'Twoja nazwa jest za krótka')
      .required('Uzupełnij to pole'),
    email: string().email('Niepoprawny E-mail').required('Uzupełnij to pole'),
    password: string()
      .min(8, 'Hasło jest za krótkie')
      .matches(/[a-z]/, 'Hasło powinno zawierać małą literę')
      .matches(/[A-Z]/, 'Hasło powinno zawierać dużą literę')
      .matches(/[1-9]/, 'Hasło powinno zawierać cyfrę')
      .required('Uzupełnij to pole'),
    passwordConfirm: string()
      .oneOf([ref('password')], 'Hasła muszą być takie same')
      .required('Uzupełnij to pole'),
  })
