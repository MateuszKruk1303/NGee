import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Button, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { activateAccount } from '../../store/login/thunks'

export default () => {
  const dispatch = useDispatch()
  const { activationHash } = useParams()

  useEffect(() => {
    const dto = { activationHash }
    dispatch(activateAccount({ dto }))
  }, [activateAccount])

  return (
    <div>
      <Typography variant="body1">Aktywowany!</Typography>
    </div>
  )
}
