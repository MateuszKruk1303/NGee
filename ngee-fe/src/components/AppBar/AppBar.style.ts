import {
  styled,
  Typography as BaseTypography,
  AppBar as BaseAppBar,
} from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors'

export const Typography = styled(BaseTypography)(() => ({
  color: 'white',
  fontWeight: 'bold',
  fontFamily: 'Roboto',
}))
export const AppBar = styled(BaseAppBar)(() => ({
  backgroundColor: deepPurple[700],
  paddingLeft: 30,
}))
