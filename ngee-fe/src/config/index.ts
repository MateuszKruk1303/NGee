import { createMuiTheme } from '@material-ui/core'
import { overrides } from './overrides'

export default createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 700,
      lg: 1280,
      xl: 1600,
    },
  },
  overrides,
})
