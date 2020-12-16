import {
  styled,
  Card as BaseCard,
  TextField as BaseTextField,
  IconButton,
} from '@material-ui/core'

export const Card = styled(BaseCard)(({ theme }) => ({
  marginTop: 20,
  padding: 20,
  width: '70%',
  borderBottom: 'none',
  boxShadow: 'none',
}))

export const TextFieldWrapper = styled('div')(() => ({
  position: 'relative',
  width: '100%',
}))

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const SendButton = styled(IconButton)(() => ({
  position: 'absolute',
  zIndex: 2000,
  bottom: 0,
  right: 0,
}))
export const CancelButton = styled(IconButton)(() => ({
  position: 'absolute',
  zIndex: 2000,
  bottom: 0,
  right: 50,
}))
export const TextField = styled(BaseTextField)(({ theme }) => ({
  width: '100%',
  marginTop: 20,
  '& .MuiInputBase-input': {
    paddingRight: 70,
  },
}))
