import React from 'react'
import { User } from '../../../store/types'
import { Grid, Typography, Avatar, IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from './Comment.style'
import { profilePicturePath } from '../../../store/login/utils'
import { normalizeImagePath } from '../PostPage'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { RootState } from '../../../store/types'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { addVoteToComment, tagAsSolution } from '../../../store/posts/thunks'

interface IComment {
  votes: []
  commentId: string
  content: string
  createdBy: User
  closed: boolean
  solution: boolean
  postId: string
}

export default ({
  votes,
  commentId,
  content,
  createdBy,
  closed,
  solution,
  postId,
}: IComment) => {
  const dispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.login.userId)
  console.log(commentId)
  const handleAddLike = () => {
    if (userId) dispatch(addVoteToComment({ dto: { commentId, userId } }))
  }

  const handleTagAsSolution = () => {
    if (userId) dispatch(tagAsSolution({ dto: { commentId, postId, userId } }))
  }

  const isLiked = () => {
    if (userId) return (votes as string[]).includes(userId)
  }

  return (
    <Card style={{ width: '100%' }}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container wrap="nowrap" alignItems="center">
            <Grid item>
              <Avatar
                src={profilePicturePath(
                  normalizeImagePath(createdBy.photo) as string
                )}
              />
            </Grid>
            <Grid item>
              <Typography style={{ paddingLeft: 10, paddingRight: 10 }}>
                {createdBy.name}
              </Typography>
            </Grid>
            <Grid item>
              {closed && solution && (
                <IconButton
                  onClick={handleTagAsSolution}
                  style={{ color: solution ? 'green' : 'inherit' }}
                  disabled={closed}
                >
                  <CheckCircleOutlineIcon />
                  <Typography>Tag as solution</Typography>
                </IconButton>
              )}
            </Grid>
            <Grid item>
              {!closed && (
                <IconButton
                  onClick={handleTagAsSolution}
                  style={{ color: solution ? 'green' : 'inherit' }}
                  disabled={closed}
                >
                  <CheckCircleOutlineIcon />
                  <Typography>Tag as solution</Typography>
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography>{content}</Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <IconButton onClick={handleAddLike} style={{ padding: 0 }}>
                <Typography style={{ paddingRight: 3 }}>Like</Typography>
                <FavoriteIcon
                  style={{ color: isLiked() ? 'red' : 'initial' }}
                />
                <Typography style={{ paddingLeft: 3 }}>
                  {votes.length}
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}
