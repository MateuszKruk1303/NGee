import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  Typography,
} from '@material-ui/core'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { register, login } from '../../store/login/thunks'
import { validationSchema } from './LoginAndRegister.utils'
import GenericDialog from '../../components/GenericDialog'
import ForgotPasswordDialog from './ForgotPasswordDialog'

interface DialogProps {
  open: boolean
  onClose: () => void
}

export interface IFormValues {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const initialValues: IFormValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

export default ({ open, onClose }: DialogProps) => {
  const dispatch = useDispatch()
  const [registerDialog, setRegisterDialog] = useState(false)
  const [forgotPasswordDialog, setForgotPasswordDialog] = useState(false)
  return (
    <>
      <GenericDialog
        title={registerDialog ? 'Register Here' : 'Login Here'}
        open={open}
        onClose={onClose}
        disableBackdropClick={true}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={registerDialog ? validationSchema : null}
          onSubmit={({ name, email, password, passwordConfirm }) => {
            if (registerDialog) {
              const dto = { name, email, password, passwordConfirm }
              dispatch(register({ dto }))
            } else {
              const dto = { email, password }
              dispatch(login({ dto }))
            }
            onClose()
          }}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={2}
                >
                  {registerDialog && (
                    <Grid item>
                      <TextField
                        variant="outlined"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        value={values.name}
                        onChange={handleChange}
                        name="name"
                        label="Username"
                      ></TextField>
                    </Grid>
                  )}
                  <Grid item>
                    <TextField
                      variant="outlined"
                      error={
                        touched.email && Boolean(errors.email) && registerDialog
                      }
                      helperText={
                        touched.email && errors.email && registerDialog
                      }
                      value={values.email}
                      onChange={handleChange}
                      name="email"
                      label="Email"
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      error={
                        touched.password &&
                        Boolean(errors.password) &&
                        registerDialog
                      }
                      helperText={
                        touched.password && errors.password && registerDialog
                      }
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      label="Password"
                    ></TextField>
                  </Grid>
                  {registerDialog && (
                    <Grid item>
                      <TextField
                        variant="outlined"
                        error={
                          touched.passwordConfirm &&
                          Boolean(errors.passwordConfirm)
                        }
                        helperText={
                          touched.passwordConfirm && errors.passwordConfirm
                        }
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        type="password"
                        name="passwordConfirm"
                        label="Repeat Password"
                      ></TextField>
                    </Grid>
                  )}
                  {!registerDialog && (
                    <Grid item>
                      <Button
                        onClick={() => {
                          onClose()
                          setForgotPasswordDialog(true)
                        }}
                      >
                        <Typography variant="body2">
                          Forgot Password?
                        </Typography>
                      </Button>
                    </Grid>
                  )}
                  {registerDialog ? (
                    <Grid item>
                      <Button onClick={() => setRegisterDialog(false)}>
                        <Typography variant="body2">
                          Already have account? Login here
                        </Typography>
                      </Button>
                    </Grid>
                  ) : (
                    <Grid item>
                      <Button onClick={() => setRegisterDialog(true)}>
                        <Typography variant="body2">
                          Dont have account yet? register here!
                        </Typography>
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Grid container justify="center" spacing={3}>
                  <Grid item>
                    <Button onClick={() => onClose()}>Cancel</Button>
                  </Grid>
                  <Grid item>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </form>
          )}
        </Formik>
      </GenericDialog>
      <ForgotPasswordDialog
        open={forgotPasswordDialog}
        onClose={() => setForgotPasswordDialog(false)}
      />
    </>
  )
}
