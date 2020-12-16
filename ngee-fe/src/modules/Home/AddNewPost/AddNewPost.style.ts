import {
  styled,
  Select as BaseSelect,
  TextField as BaseTextField,
  FormControl as BaseFormControl,
  Chip as BaseChip,
  Theme,
} from '@material-ui/core'
import {
  green,
  orange,
  purple,
  blue,
  teal,
  lime,
} from '@material-ui/core/colors'

const tagColors = [teal[100], purple[100], green[100], blue[100], lime[100]]

export const TextField = styled(BaseTextField)(({ theme }) => ({
  width: 300,
  [theme.breakpoints.down('sm')]: {
    width: 200,
    minWidth: 200,
    maxWidth: 200,
  },
}))

export const Select = styled(BaseSelect)(({ theme }) => ({
  minWidth: 300,
  [theme.breakpoints.down('sm')]: {
    minWidth: 200,
    maxWidth: 200,
  },
}))

export const Chip = styled(BaseChip)(
  ({ theme, index }: { theme: Theme; index: number }) => ({
    backgroundColor: tagColors[index],
    fontSize: 12,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
  })
)

export const FormControl = styled(BaseFormControl)(() => ({
  maxWidth: 200,
}))

export const SelectFile = styled('input')(() => ({
  textAlign: 'center',
  width: 200,
}))

export const Wrapper = styled('div')(({ theme }) => ({
  width: 340,
  [theme.breakpoints.down('sm')]: {
    width: 200,
    minWidth: 200,
    maxWidth: 200,
  },
}))
