import {
  styled,
  Card as BaseCard,
  CardContent as BaseCardContent,
} from '@material-ui/core'

export const Card = styled(BaseCard)(() => ({
  minWidth: 300,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const CardContent = styled(BaseCardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))
