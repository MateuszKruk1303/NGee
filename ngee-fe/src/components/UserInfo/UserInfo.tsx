import React, { useState } from 'react'
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

export default () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const user = useSelector((state: RootState) => state.login)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout(null))
  }
  return (
    <div>
      <Grid container wrap="nowrap" alignItems="center">
        <Typography>{user.name}</Typography>
        <IconButton
          onClick={e => {
            setAnchorEl(e.currentTarget)
          }}
        >
          <Avatar>T</Avatar>
        </IconButton>
      </Grid>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
          }}
        >
          <Link to="/UserProfile">Profile</Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout()
            setAnchorEl(null)
          }}
        >
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  )
}
