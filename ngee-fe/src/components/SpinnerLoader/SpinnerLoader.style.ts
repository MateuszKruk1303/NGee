import {
  styled,
  Backdrop as BaseBackdrop,
  CircularProgress as BaseCircularProgress,
} from '@material-ui/core'

export const Backdrop = styled(BaseBackdrop)({
  zIndex: 80,
})
export const CircularProgress = styled(BaseCircularProgress)({
  zIndex: 90,
})
