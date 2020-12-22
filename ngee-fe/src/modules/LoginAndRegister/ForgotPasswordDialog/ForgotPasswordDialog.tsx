import React from 'react'
import GenericDialog from '../../../components/GenericDialog'
import { TextField, Grid, Button } from '@material-ui/core'
import { Formik } from 'formik'
import { validationSchema, onSubmit } from './ForgotPasswordDialog.utils'
import { useDispatch } from 'react-redux'

interface IForgotPasswordDialog {
  open: boolean
  onClose: () => void
}

export interface IFormValues {
  email: string
}

const initialValues = {
  email: '',
}
export default ({ open, onClose }: IForgotPasswordDialog) => {
  const dispatch = useDispatch()
  return (
    <GenericDialog
      open={open}
      title="Zresetuj swoje hasło"
      onClose={onClose}
      disableBackdropClick
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ email }) => {
          onSubmit(email, dispatch)
          onClose()
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <TextField
                  variant="outlined"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  label="E-mail"
                />
              </Grid>
              <Grid item>
                <Grid container justify="center">
                  <Grid item>
                    <Button
                      onClick={() => {
                        onClose()
                      }}
                      style={{ marginRight: 10 }}
                    >
                      Anuluj
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ marginLeft: 10 }}
                    >
                      Wyślij
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </GenericDialog>
  )
}
