import { deepPurple, purple } from '@material-ui/core/colors'
import { Overrides } from '@material-ui/core/styles/overrides'

export const overrides: Overrides = {
  MuiButton: {
    root: {},
    contained: {
      backgroundColor: purple[600],
      color: 'white',
    },
  },
}
