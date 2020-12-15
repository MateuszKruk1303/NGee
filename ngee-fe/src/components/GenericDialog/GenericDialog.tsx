import React from 'react'
import { Typography, Dialog } from '@material-ui/core'
import { Wrapper, DialogTitle, DialogContent } from './GenericDialog.style'

interface IGenericDialog {
  open: boolean
  title: string
  children: JSX.Element
  onClose: () => void
  disableBackdropClick?: boolean
  isBig?: boolean
}

export default ({
  open,
  title,
  children,
  onClose,
  disableBackdropClick,
  isBig,
}: IGenericDialog) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick={disableBackdropClick}
    >
      <Wrapper isBig={isBig}>
        <DialogTitle>
          <Typography variant="h5">{title}</Typography>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Wrapper>
    </Dialog>
  )
}
