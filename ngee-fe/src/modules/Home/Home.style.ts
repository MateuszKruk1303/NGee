import { styled, Button as BaseButton } from '@material-ui/core'

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 50,
  paddingBottom: 20,
}))

export const Button = styled(BaseButton)(() => ({
  marginBottom: 20,
}))
