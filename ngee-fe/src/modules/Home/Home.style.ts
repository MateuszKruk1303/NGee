import { styled, Button as BaseButton } from '@material-ui/core'

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: 10,
  paddingLeft: 10,
  paddingTop: 50,
  paddingBottom: 20,
}))

export const SearchContainer = styled('div')(() => ({
  marginBottom: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const SearchButton = styled(BaseButton)(() => ({
  marginLeft: 10,
}))

export const Button = styled(BaseButton)(() => ({
  marginBottom: 20,
}))
