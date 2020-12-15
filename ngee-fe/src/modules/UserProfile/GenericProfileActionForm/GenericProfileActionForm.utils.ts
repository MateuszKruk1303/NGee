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
      return 'Old password'
    case 'emailChange':
      return 'New email'
    case 'nickChange':
      return 'New nickname'
    case 'deleteAccount':
    default:
  }
}
const varfieldSchema = {
  passwordChange: string()
    .min(8, 'Your password is too short')
    .matches(/[a-z]/, 'At least one lowercase character')
    .matches(/[A-Z]/, 'At least one uppercase character')
    .matches(/[1-9]/, 'At least one number')
    .required('Fill this field'),
  emailChange: string().email('Invalid Email').required('Fill this field'),
  nickChange: string()
    .min(2, 'Your name is too short')
    .required('Fill this field'),
}

export const validationSchema = (formType: formType) =>
  object().shape<IFormValues>({
    varField:
      formType === 'deleteAccount' ? string() : varfieldSchema[formType],
    password: string()
      .min(8, 'Your password is too short')
      .matches(/[a-z]/, 'At least one lowercase character')
      .matches(/[A-Z]/, 'At least one uppercase character')
      .matches(/[1-9]/, 'At least one number')
      .required('Fill this field'),
    passwordConfirm:
      formType === 'passwordChange'
        ? string()
            .oneOf([ref('password')], 'Passwords must match')
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
