import {
  styled,
  Button as BaseButton,
  Select as BaseSelect,
} from '@material-ui/core'

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
  minWidth: 350,
  flexWrap: 'wrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const SearchButton = styled(BaseButton)(() => ({
  marginTop: 20,
  marginLeft: 10,
}))

export const Select = styled(BaseSelect)(() => ({
  width: 240,
  marginRight: 10,
}))

export const Button = styled(BaseButton)(() => ({
  marginBottom: 20,
}))
