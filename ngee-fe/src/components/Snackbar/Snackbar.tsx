import React, { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

export default ({
  message,
  isError,
}: {
  message: string
  isError: boolean
}) => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(Boolean(message))

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={2000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={() => setSnackbarOpen(false)}
        severity={isError ? 'error' : 'success'}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  )
}
