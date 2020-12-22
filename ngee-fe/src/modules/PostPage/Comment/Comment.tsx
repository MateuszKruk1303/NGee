import React, { useState } from 'react'
import { User } from '../../../store/types'
import {
  Grid,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Hidden,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from './Comment.style'
import { profilePicturePath } from '../../../store/login/utils'
import { normalizeImagePath } from '../PostPage'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { RootState } from '../../../store/types'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import {
  addVoteToComment,
  tagAsSolution,
  editComment,
  deleteComment,
} from '../../../store/posts/thunks'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {
  TextFieldWrapper,
  SendButton,
  TextField,
  CancelButton,
} from '../PostPage.style'
import SendIcon from '@material-ui/icons/Send'
import CancelIcon from '@material-ui/icons/Cancel'

interface IComment {
  votes: []
  commentId: string
  content: string
  createdBy: User
  closed: boolean
  createDate: Date
  solution: boolean
  postId: string
  postCreatorId: string
}

export default ({
  votes,
  commentId,
  content,
  createdBy,
  closed,
  createDate,
  solution,
  postId,
  postCreatorId,
}: IComment) => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isCommentEdited, setCommentEdit] = useState(false)
  const [comment, setComment] = useState(content)
  const { userId, isAdmin } = useSelector((state: RootState) => state.login)
  const open = Boolean(anchorEl)

  const isCreator = isAdmin || createdBy.userId == userId

  const handleAddLike = () => {
    if (userId) dispatch(addVoteToComment({ dto: { commentId, userId } }))
  }

  const handleTagAsSolution = () => {
    if (userId) dispatch(tagAsSolution({ dto: { commentId, postId, userId } }))
  }

  const isLiked = () => {
    if (userId) return (votes as string[]).includes(userId)
  }

  const handleEditComment = () => {
    if (userId)
      dispatch(
        editComment({ dto: { commentId, userId, postId, content: comment } })
      )
  }

  const handleDeleteComment = () => {
    if (userId) dispatch(deleteComment({ dto: { commentId, userId, postId } }))
  }

  return (
    <>
      {isCommentEdited ? (
        <TextFieldWrapper>
          <SendButton
            onClick={() => {
              handleEditComment()
              setCommentEdit(false)
            }}
          >
            <SendIcon fontSize="small" />
          </SendButton>
          <CancelButton onClick={() => setCommentEdit(false)}>
            <CancelIcon fontSize="small" />
          </CancelButton>
          <TextField
            placeholder="Komentarz..."
            multiline
            rows={2}
            rowsMax={7}
            variant="outlined"
            value={comment}
            onChange={e => {
              setComment(e.target.value)
            }}
          />
        </TextFieldWrapper>
      ) : (
        <Card style={{ width: '100%' }}>
          <Grid
            container
            direction="column"
            spacing={1}
            justify="space-between"
          >
            <Grid item>
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                justify="space-between"
              >
                <Grid item>
                  <Grid container alignItems="center" justify="center">
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
                          <Typography>
                            {solution
                              ? 'Rozwiązanie'
                              : 'Oznacz jako rozwiązanie'}
                          </Typography>
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item>
                      {!closed && postCreatorId === userId && (
                        <IconButton
                          onClick={handleTagAsSolution}
                          style={{ color: solution ? 'green' : 'inherit' }}
                          disabled={closed}
                        >
                          <CheckCircleOutlineIcon />
                          <Typography>Oznacz jako rozwiązanie</Typography>
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {createDate ? createDate.toLocaleString() : ''}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {isCreator && (
                    <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Hidden smDown>
              <Grid item>
                <Typography>{content}</Typography>
              </Grid>
              <Grid item>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <IconButton onClick={handleAddLike} style={{ padding: 0 }}>
                      <Typography style={{ paddingRight: 3 }}>Polub</Typography>
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
            </Hidden>
            <Hidden mdUp>
              <Grid item>
                <Grid container justify="center">
                  <Grid item xs={12}>
                    <Typography
                      style={{ textAlign: 'center', marginBottom: 12 }}
                    >
                      {content}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container wrap="nowrap">
                      <Grid item>
                        <IconButton
                          onClick={handleAddLike}
                          style={{ padding: 0 }}
                        >
                          <Typography style={{ paddingRight: 3 }}>
                            Polub
                          </Typography>
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
              </Grid>
            </Hidden>
          </Grid>
          <Menu
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
          >
            <MenuItem
              onClick={() => {
                setCommentEdit(true)
                setAnchorEl(null)
              }}
            >
              Edytuj komentarz
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDeleteComment()
                setAnchorEl(null)
              }}
            >
              Usuń komentarz
            </MenuItem>
          </Menu>
        </Card>
      )}
    </>
  )
}
