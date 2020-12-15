import { object, string, ref } from 'yup'
import { IFormValues } from './ResetPasswordPage'
import { Dispatch } from 'redux'
import { resetPassword } from '../../store/login/thunks'

export const validationSchema = () =>
  object().shape<IFormValues>({
    newPassword: string()
      .min(8, 'Your password is too short')
      .matches(/[a-z]/, 'At least one lowercase character')
      .matches(/[A-Z]/, 'At least one uppercase character')
      .matches(/[1-9]/, 'At least one number')
      .required('Fill this field'),
    newPasswordConfirm: string()
      .oneOf([ref('newPassword')], 'Passwords must match')
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
