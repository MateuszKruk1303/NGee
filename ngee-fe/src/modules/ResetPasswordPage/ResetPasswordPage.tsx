import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { Wrapper } from './ResetPasswordPage.style'
import { TextField, Grid, Button } from '@material-ui/core'
import GenericCard from '../UserProfile/GenericProfileActionCard'
import { validationSchema } from './ResetPasswordPage.utils'
import { onSubmit } from './ResetPasswordPage.utils'

export interface IFormValues {
  newPassword: string
  newPasswordConfirm: string
}

const initialValues: IFormValues = {
  newPassword: '',
  newPasswordConfirm: '',
}

export default () => {
  const dispatch = useDispatch()
  const { emergencyId } = useParams()

  return (
    <Wrapper>
      <GenericCard title="Reset your password" actionsAvailable={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(
              values.newPassword,
              values.newPasswordConfirm,
              emergencyId,
              dispatch
            )
            resetForm()
          }}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <TextField
                    variant="outlined"
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                    value={values.newPassword}
                    onChange={handleChange}
                    type="password"
                    name="newPassword"
                    label="New password"
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    error={
                      touched.newPasswordConfirm &&
                      Boolean(errors.newPasswordConfirm)
                    }
                    helperText={
                      touched.newPasswordConfirm && errors.newPasswordConfirm
                    }
                    value={values.newPasswordConfirm}
                    onChange={handleChange}
                    type="password"
                    name="newPasswordConfirm"
                    label="Repeat Password"
                  ></TextField>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginLeft: 10 }}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </GenericCard>
    </Wrapper>
  )
}