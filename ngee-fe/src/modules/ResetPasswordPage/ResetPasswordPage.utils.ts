import { object, string, ref } from 'yup'
import { IFormValues } from './ResetPasswordPage'
import { Dispatch } from 'redux'
import { resetPassword } from '../../store/login/thunks'

export const validationSchema = () =>
  object().shape<IFormValues>({
    newPassword: string()
      .min(8, 'Hasło jest za krótkie')
      .matches(/[a-z]/, 'Hasło powinno zawierać małą literę')
      .matches(/[A-Z]/, 'Hasło powinno zawierać dużą literę')
      .matches(/[1-9]/, 'Hasło powinno zawierać cyfrę')
      .required('Uzupełnij to pole'),
    newPasswordConfirm: string()
      .oneOf([ref('newPassword')], 'Hasła muszą być takie same')
      .required(),
  })

export const onSubmit = (
  newPassword: string,
  newPasswordConfirm: string,
  emergencyId: string,
  dispatch: Dispatch
) => {
  dispatch(
    resetPassword({
      dto: { newPassword, newPasswordConfirm, emergencyId },
    }) as any
  )
}
