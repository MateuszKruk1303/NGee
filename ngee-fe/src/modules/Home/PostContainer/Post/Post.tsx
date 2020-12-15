import React from 'react'
import { CardContent, Typography, Grid, Chip } from '@material-ui/core'
import { Card, StatusChip, TagChip } from './Post.style'
import { User } from '../../../../store/types'
import { Link } from 'react-router-dom'
import ModeCommentIcon from '@material-ui/icons/ModeComment'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Comment } from '../../../../store/types'

interface IPostContainer {
  title: string
  category: string
  tags: string[]
  votes: string[]
  id: string
  comments: string[] | Comment[]
  closed: boolean
  createDate: Date
}

export default ({
  title,
  category,
  tags,
  votes,
  id,
  comments,
  closed,
  createDate,
}: IPostContainer) => {
  return (
    <Link to={{ pathname: `/post/${id}` }}>
      <Card>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <Grid
              container
              direction="column"
              justify="space-between"
              spacing={1}
            >
              <Grid item>
                <Grid container>
                  <StatusChip
                    label={closed ? 'closed' : 'open'}
                    status={closed}
                  />
                  <Grid item>
                    <Typography variant="body2" style={{ paddingLeft: 5 }}>
                      {createDate.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="h6">{title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  Category: {category}
                </Typography>
              </Grid>
              <Grid item>
                {tags.map((tag, index) => (
                  <TagChip label={tag} index={index} />
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Grid container spacing={1} wrap="nowrap">
                  <Grid item>
                    <FavoriteIcon />
                  </Grid>
                  <Grid item>
                    <Typography>{votes.length}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1} wrap="nowrap">
                  <Grid item>
                    <ModeCommentIcon />
                  </Grid>
                  <Grid item>
                    <Typography>{comments.length}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Link>
  )
}
