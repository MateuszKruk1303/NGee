import { styled, Chip, Theme } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'

export const IconWrapper = styled('div')(() => ({
  position: 'relative',
}))

export const NumberChip = styled(Chip)(
  ({ theme, number }: { theme: Theme; number: number }) => ({
    position: 'absolute',
    backgroundColor: 'red',
    color: 'white',
    fontSize: 12,
    width: 18,
    height: 18,
    right: 0,
    top: 0,
    '& .MuiChip-label': {
      marginRight: number > 9 ? 13 : 7,
    },
  })
)
export const NotificationChip = styled(Chip)(() => ({
  width: 10,
  height: 10,
  backgroundColor: orange[800],
}))
