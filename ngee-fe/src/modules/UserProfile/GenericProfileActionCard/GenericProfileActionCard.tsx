import React from 'react'
import { CardActions, Typography } from '@material-ui/core'
import { Card, CardContent } from './GenericProfileActionCard.style'
import { Button } from '../UserProfile.style'
interface IGenericProfileActionCard {
  title: string
  actionsAvailable: Boolean
  children: JSX.Element
  actionTitle?: string
  onButtonClick?: () => void
  disabled?: boolean
}

export default ({
  title,
  children,
  actionTitle,
  onButtonClick,
  actionsAvailable,
  disabled,
}: IGenericProfileActionCard) => (
  <Card style={{ boxShadow: 'none' }}>
    <Typography variant="h5">{title}</Typography>
    <CardContent>{children}</CardContent>
    {actionsAvailable && (
      <CardActions>
        <Button disabled={disabled} onClick={onButtonClick} variant="contained">
          <Typography variant="body2">{actionTitle}</Typography>
        </Button>
      </CardActions>
    )}
  </Card>
)
