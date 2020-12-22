import { object, string, ref } from 'yup'
import { IFormValues } from './GenericProfileActionForm'
import { Dispatch } from 'redux'
import {
  changeEmail,
  changeNickname,
  changePassword,
  deleteAccount,
} from '../../../store/login/thunks'

export type formType =
  | 'passwordChange'
  | 'emailChange'
  | 'nickChange'
  | 'deleteAccount'

export const varfieldLabel = (formType: formType) => {
  switch (formType) {
    case 'passwordChange':
      return 'Stare hasło'
    case 'emailChange':
      return 'Nowy e-mail'
    case 'nickChange':
      return 'Nowa nazwa'
    case 'deleteAccount':
    default:
  }
}
const varfieldSchema = {
  passwordChange: string()
    .min(8, 'Hasło jest za krótkie')
    .matches(/[a-z]/, 'Hasło powinno zawierać małą literę')
    .matches(/[A-Z]/, 'Hasło powinno zawierać dużą literę')
    .matches(/[1-9]/, 'Hasło powinno zawierać cyfrę')
    .required('Uzupełnij to pole'),
  emailChange: string()
    .email('Niepoprawny e-mail')
    .required('Uzupełnij to pole'),
  nickChange: string()
    .min(2, 'Nazwa jest zbyt krótka')
    .required('Uzupełnij to pole'),
}

export const validationSchema = (formType: formType) =>
  object().shape<IFormValues>({
    varField:
      formType === 'deleteAccount' ? string() : varfieldSchema[formType],
    password: string()
      .min(8, 'Hasło jest za krótkie')
      .matches(/[a-z]/, 'Hasło powinno zawierać małą literę')
      .matches(/[A-Z]/, 'Hasło powinno zawierać dużą literę')
      .matches(/[1-9]/, 'Hasło powinno zawierać cyfrę')
      .required('Uzupełnij to pole'),
    passwordConfirm:
      formType === 'passwordChange'
        ? string()
            .oneOf([ref('password')], 'Hasła muszą być takie same')
            .required()
        : string(),
  })

export const onSubmit = (
  { varField, password, passwordConfirm }: IFormValues,
  dispatch: Dispatch<any>,
  formType: string,
  userId: string
) => {
  switch (formType) {
    case 'passwordChange':
      dispatch(
        changePassword({
          dto: {
            userId,
            oldPassword: varField,
            newPassword: password,
            newPasswordConfirm: passwordConfirm,
          },
        })
      )
      break
    case 'emailChange':
      dispatch(changeEmail({ dto: { userId, email: varField, password } }))
      break
    case 'nickChange':
      dispatch(
        changeNickname({ dto: { userId, newNickname: varField, password } })
      )
      break
    case 'deleteAccount':
      dispatch(deleteAccount({ dto: { userId, password } }))
      break
    default:
  }
}
