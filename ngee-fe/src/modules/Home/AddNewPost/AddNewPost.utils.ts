import { object, string, ref } from 'yup'

interface IFormValues {
  title: string
  content: string
}

export const validationSchema = () =>
  object().shape<IFormValues>({
    title: string().min(5).required(),
    content: string().min(10).required(),
  })
