import React from 'react'
import { TextField, Grid, Button } from '@material-ui/core'
import { Formik } from 'formik'
import {
  validationSchema,
  onSubmit,
  formType,
  varfieldLabel,
} from './GenericProfileActionForm.utils'
import { useDispatch } from 'react-redux'

interface IGenericProfileActionForm {
  formType: formType
  userId: string
  onClose: () => void
}

export interface IFormValues {
  varField: string
  password: string
  passwordConfirm: string
}

const initialValues: IFormValues = {
  varField: '',
  password: '',
  passwordConfirm: '',
}

export default ({ formType, userId, onClose }: IGenericProfileActionForm) => {
  const dispatch = useDispatch()
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(formType)}
      onSubmit={(data, { resetForm }) => {
        resetForm()
        onSubmit(data, dispatch, formType, userId)
      }}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" alignItems="center" spacing={2}>
            {formType !== 'deleteAccount' && (
              <Grid item>
                <TextField
                  variant="outlined"
                  error={touched.varField && Boolean(errors.varField)}
                  helperText={touched.varField && errors.varField}
                  value={values.varField}
                  onChange={handleChange}
                  type={formType === 'passwordChange' ? 'password' : ''}
                  name="varField"
                  label={varfieldLabel(formType)}
                ></TextField>
              </Grid>
            )}
            <Grid item>
              <TextField
                variant="outlined"
                error={
                  touched.password &&
                  Boolean(errors.password) &&
                  formType === 'passwordChange'
                }
                helperText={
                  touched.password &&
                  errors.password &&
                  formType === 'passwordChange'
                }
                type="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                label={formType === 'passwordChange' ? 'Nowe hasło' : 'Hasło'}
              ></TextField>
            </Grid>
            {formType === 'passwordChange' && (
              <Grid item>
                <TextField
                  variant="outlined"
                  error={
                    touched.passwordConfirm && Boolean(errors.passwordConfirm)
                  }
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  type="password"
                  name="passwordConfirm"
                  label="Powtórz nowe hasło"
                ></TextField>
              </Grid>
            )}
            <Grid item>
              <Grid container justify="center" spacing={3}>
                <Grid item>
                  <Button onClick={() => onClose()}>Anuluj</Button>
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained">
                    Zastosuj
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}
