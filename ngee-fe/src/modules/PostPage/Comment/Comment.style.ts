import {
  styled,
  Card as BaseCard,
  TextField as BaseTextField,
} from '@material-ui/core'

export const Card = styled(BaseCard)(({ theme }) => ({
  marginTop: 10,
  padding: 10,
  boxShadow: 'none',
  width: '100%',
}))
