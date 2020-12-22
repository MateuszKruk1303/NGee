import { styled, Card as BaseCard, Chip, Theme } from '@material-ui/core'
import {
  green,
  orange,
  purple,
  blue,
  teal,
  lime,
} from '@material-ui/core/colors'

const tagColors = [teal[100], purple[100], green[100], blue[100], lime[100]]

export const Card = styled(BaseCard)(({ theme }) => ({
  marginTop: 16,
  boxShadow: 'none',
  border: '.4px solid rgba(0,0,0,0.2)',
  padding: 20,
  minWidth: '95vw',
  [theme.breakpoints.down('sm')]: {
    minWidth: 'unset',
    width: '95vw',
  },
}))

export const StatusChip = styled(Chip)(
  ({ theme, status }: { theme: Theme; status: boolean }) => ({
    backgroundColor: status ? green[400] : orange[400],
    height: 18,
    textAlign: 'center',
  })
)

export const TagChip = styled(Chip)(
  ({ theme, index }: { theme: Theme; index: number }) => ({
    backgroundColor: tagColors[index],
    fontSize: 12,
    height: 25,
  })
)
