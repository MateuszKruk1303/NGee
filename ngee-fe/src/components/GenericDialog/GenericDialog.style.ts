import {
  styled,
  DialogTitle as BaseDialogTitle,
  Dialog as BaseDialog,
  DialogContent as BaseDialogContent,
  Theme,
} from '@material-ui/core'

export const DialogTitle = styled(BaseDialogTitle)(() => ({
  textAlign: 'center',
}))

export const DialogContent = styled(BaseDialogContent)(() => ({
  padding: 25,
}))

export const Wrapper = styled('div')(
  ({ theme, isBig }: { theme: Theme; isBig?: boolean }) => ({
    minWidth: isBig ? 600 : 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
  })
)
