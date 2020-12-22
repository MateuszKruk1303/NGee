import React, { useState } from 'react'
import { Grid, Button, Hidden, IconButton } from '@material-ui/core'
import RegisterDialog from '../../modules/LoginAndRegister/LoginAndRegister'
import { AppBar, Typography } from './AppBar.style'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/types'
import UserInfo from '../UserInfo'
import { Link } from 'react-router-dom'
import Notifications from '../Notifications'
import InfoIcon from '@material-ui/icons/Info'
import AboutDialog from '../AboutDialog'

export default () => {
  const [isDialogOpened, setDialogOpen] = useState(false)
  const [isAboutDialogOpen, setAboutDialogOpen] = useState(false)
  const user = useSelector((state: RootState) => state.login)
  return (
    <AppBar position="fixed">
      <Hidden smDown>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <Grid item style={{ marginRight: 16 }}>
                <Link to="/">
                  <Typography variant="h4" className="title">
                    NGee
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Button
                  style={{ color: 'white' }}
                  onClick={() => {
                    setAboutDialogOpen(true)
                  }}
                >
                  O programie
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {user.userId ? (
              <Grid container>
                <Notifications />
                <UserInfo
                  userId={user.userId}
                  name={user.name}
                  profilePicture={user.profilePicture}
                />
              </Grid>
            ) : (
              <Button onClick={() => setDialogOpen(true)}>
                <Typography variant="body2">Zaloguj/Zarejestruj się</Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Grid container alignItems="center" wrap="nowrap">
              <Grid item style={{ marginRight: 16 }}>
                <Link to="/">
                  <Typography variant="h4" className="title">
                    NGee
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => {
                    setAboutDialogOpen(true)
                  }}
                >
                  <InfoIcon style={{ color: 'white' }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {user.userId ? (
              <Grid container>
                <Notifications />
                <UserInfo
                  userId={user.userId}
                  name={user.name}
                  profilePicture={user.profilePicture}
                />
              </Grid>
            ) : (
              <Button onClick={() => setDialogOpen(true)}>
                <Typography variant="body2">Zaloguj/Zarejestruj się</Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </Hidden>
      <RegisterDialog
        open={isDialogOpened}
        onClose={() => setDialogOpen(false)}
      />
      <AboutDialog
        open={isAboutDialogOpen}
        onClose={() => {
          setAboutDialogOpen(false)
        }}
      />
    </AppBar>
  )
}
