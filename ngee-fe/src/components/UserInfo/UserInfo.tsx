import React, { useEffect, useState } from 'react'
import {
  Avatar,
  IconButton,
  Menu,
  Typography,
  Grid,
  MenuItem,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/types'
import { logout } from '../../store/login/reducers'
import { Link } from 'react-router-dom'

export default ({
  userId,
  name,
  profilePicture,
}: {
  userId: string
  name: string | null
  profilePicture: string | null
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout(null))
  }

  return (
    <div style={{ paddingLeft: 20 }}>
      <Grid container wrap="nowrap" alignItems="center">
        <Typography>{name}</Typography>
        <IconButton
          onClick={e => {
            setAnchorEl(e.currentTarget)
          }}
        >
          <Avatar src={profilePicture ? profilePicture : ''} />
        </IconButton>
      </Grid>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
          }}
        >
          <Link to="/UserProfile" style={{ color: 'black' }}>
            Profil
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout()
            setAnchorEl(null)
          }}
        >
          <Typography style={{ color: 'red' }}>Wyloguj się</Typography>
        </MenuItem>
      </Menu>
    </div>
  )
}
