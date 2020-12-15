import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import RegisterDialog from '../../modules/LoginAndRegister/LoginAndRegister'
import { AppBar, Typography } from './AppBar.style'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import UserInfo from '../UserInfo'
import { Link } from 'react-router-dom'

export default () => {
  const [isDialogOpened, setDialogOpen] = useState(false)
  const user = useSelector((state: RootState) => state.login)
  return (
    <AppBar position="fixed">
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Link to="/">
            <Typography variant="h6" className="title">
              NGee
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          {user.userId ? (
            <UserInfo
              userId={user.userId}
              name={user.name}
              profilePicture={user.profilePicture}
            />
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
