import React, { useState } from 'react'
import { AppBar, Grid, Button, Typography } from '@material-ui/core'
import RegisterDialog from '../../modules/User/LoginAndRegister'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import UserInfo from '../UserInfo'
import { Link } from 'react-router-dom'

export default () => {
  const [isDialogOpened, setDialogOpen] = useState(false)
  const isLoggedIn = useSelector((state: RootState) => state.login.userId)
  return (
    <AppBar position="sticky">
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Link to="/">
            <Typography>Ngee :)</Typography>
          </Link>
        </Grid>
        <Grid item>
          {isLoggedIn ? (
            <UserInfo />
          ) : (
            <Button onClick={() => setDialogOpen(true)}>Login</Button>
          )}
        </Grid>
      </Grid>
      <RegisterDialog
        open={isDialogOpened}
        onClose={() => setDialogOpen(false)}
      />
    </AppBar>
  )
}
