import { object, string, ref } from 'yup'
import { IFormValues } from './ForgotPasswordDialog'
import { Dispatch } from 'redux'
import { orderResetPassword } from '../../../store/login/thunks'

export const validationSchema = () =>
  object().shape<IFormValues>({
    email: string().email('Invalid Email').required('Fill this field'),
  })

export const onSubmit = (email: string, dispatch: Dispatch) => {
  dispatch(orderResetPassword({ dto: { email } }) as any)
}
