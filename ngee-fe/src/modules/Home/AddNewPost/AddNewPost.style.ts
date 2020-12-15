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

export const TextField = styled(BaseTextField)(() => ({
  width: 300,
}))

export const Select = styled(BaseSelect)(() => ({
  minWidth: 300,
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
