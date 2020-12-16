import React, { useEffect, useState } from 'react'
import { getNotifications, notificationUpdate } from '../../store/login/thunks'
import {
  IconWrapper,
  NumberChip,
  NotificationChip,
} from './Notifications.style'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Menu, MenuItem, Grid, Typography } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { RootState } from '../../store/types'
import { Link } from 'react-router-dom'

export default () => {
  const dispatch = useDispatch()
  const notifications = useSelector(
    (state: RootState) => state.login.notifications
  )
  const userId = useSelector((state: RootState) => state.login.userId)
  useEffect(() => {
    if (userId) dispatch(getNotifications({ dto: { userId } }))
  }, [getNotifications])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const notWatchedNotificationsLength = () => {
    return notifications.filter(notification => !notification.watched).length
  }
  const handleWatchNotification = (notificationId: string) => {
    if (userId)
      dispatch(notificationUpdate({ dto: { notificationId, userId } }))
  }

  return (
    <>
      <IconButton
        onClick={e => {
          setAnchorEl(e.currentTarget)
        }}
      >
        <IconWrapper>
          {notWatchedNotificationsLength() > 0 && (
            <NumberChip
              number={notWatchedNotificationsLength()}
              label={notWatchedNotificationsLength()}
            />
          )}

          <NotificationsIcon
            style={{ color: 'rgb(153,153,153)' }}
            fontSize="large"
          />
        </IconWrapper>
      </IconButton>
      <Menu
        open={open}
        onClose={() => {
          setAnchorEl(null)
        }}
        anchorEl={anchorEl}
        style={{ zIndex: 9999 }}
      >
        {notifications.map(notification => (
          <MenuItem
            onClick={() => {
              setAnchorEl(null)
              handleWatchNotification(notification.notificationId)
            }}
          >
            <Link to={{ pathname: `/post/${notification.postId}` }}>
              <Grid container direction="column">
                <Grid item>
                  {!notification.watched && <NotificationChip />}
                  <Typography variant="body2">
                    {notification.date.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {notification.content}
                  </Typography>
                </Grid>
              </Grid>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
