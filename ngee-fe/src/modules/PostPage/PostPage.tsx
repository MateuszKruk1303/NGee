import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPostById,
  addVote,
  addComment,
  deletePost,
  editPost,
} from '../../store/posts/thunks'
import { RootState } from '../../store/types'
import {
  Typography,
  Grid,
  Avatar,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'
import {
  Card,
  Wrapper,
  TextField,
  TextFieldWrapper,
  SendButton,
} from './PostPage.style'
import { profilePicturePath } from '../../store/login/utils'
import { StatusChip, TagChip } from '../Home/PostContainer/Post/Post.style'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Comment from './Comment'
import SendIcon from '@material-ui/icons/Send'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import GenericDialog from '../../components/GenericDialog'
import AddPostForm from '../Home/AddNewPost'
import SpinnerLoader from '../../components/SpinnerLoader'

export const normalizeImagePath = (imagePath: string) => {
  if (imagePath) return imagePath.split('\\')[imagePath.split('\\').length - 1]
  return null
}

export default () => {
  const dispatch = useDispatch()
  const { postId } = useParams()
  const [isImgModalOpen, setImgModalOpen] = useState(false)
  const [modalPhoto, setModalPhoto] = useState('')
  const [comment, setComment] = useState('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const open = Boolean(anchorEl)

  useEffect(() => {
    dispatch(getPostById({ dto: { postId } }))
  }, [getPostById])
  const post = useSelector((state: RootState) => state.post.post)
  const userId = useSelector((state: RootState) => state.login.userId)
  const isLoading = useSelector((state: RootState) => state.post.isLoading)

  const isCreator = post?.createdBy.userId == userId

  const postPicturePath = (photo: string) =>
    `${process.env.REACT_APP_BACKEND_URL}/postPictures/${photo}`

  const handleAddLike = () => {
    if (userId) dispatch(addVote({ dto: { postId, userId } }))
  }

  const isLiked = () => {
    if (userId) return (post!.votes as string[]).includes(userId)
  }

  const handleAddComment = () => {
    if (userId) {
      dispatch(addComment({ dto: { postId, userId, content: comment } }))
      setComment('')
    }
  }

  const handleDeletePost = () => {
    if (userId) dispatch(deletePost({ dto: { postId, userId } }))
  }
  return (
    <Wrapper>
      <SpinnerLoader isLoading={isLoading} />

      <Card>
        {post && (
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Grid container justify="space-between">
                <Grid item>
                  <Grid container wrap="nowrap" alignItems="center">
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        style={{ paddingRight: 10 }}
                      >
                        {post.createdBy.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Avatar
                        src={profilePicturePath(
                          normalizeImagePath(post.createdBy.photo) as string
                        )}
                      />
                    </Grid>
                    <Grid item>
                      <Typography style={{ paddingLeft: 10 }}>
                        asking:
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container wrap="nowrap" style={{ paddingTop: 5 }}>
                    <Grid item>
                      <Typography style={{ paddingRight: 10 }}>
                        {post.createDate.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <StatusChip
                        label={post.closed ? 'closed' : 'open'}
                        status={post.closed}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container wrap="nowrap" justify="center">
                <Grid item>
                  <Typography variant="h5" style={{ textAlign: 'center' }}>
                    {post.title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                wrap="nowrap"
                justify="center"
                style={{ paddingTop: 20 }}
              >
                <Grid item>
                  <Typography variant="body2">{post.content}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                justify="center"
                alignItems="center"
                spacing={4}
                style={{ paddingTop: 20 }}
              >
                {post.photos.map(photo => (
                  <Grid item>
                    <img
                      src={postPicturePath(normalizeImagePath(photo) as string)}
                      onClick={() => {
                        setImgModalOpen(true)
                        setModalPhoto(photo)
                      }}
                      style={{ width: 120, height: 120 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                spacing={3}
                justify="space-between"
                alignItems="center"
                wrap="nowrap"
              >
                <Grid item>
                  <Typography variant="body2" style={{ paddingBottom: 4 }}>
                    tags:
                  </Typography>
                  {post.tags.map((tag, index) => (
                    <TagChip label={tag} index={index}></TagChip>
                  ))}
                </Grid>
                <Grid item>
                  <Grid
                    container
                    wrap="nowrap"
                    alignItems="center"
                    style={{ paddingTop: 20 }}
                  >
                    <Grid item>
                      <IconButton
                        onClick={handleAddLike}
                        style={{ padding: 0 }}
                      >
                        <Typography style={{ paddingRight: 3 }}>
                          Like
                        </Typography>
                        <FavoriteIcon
                          style={{ color: isLiked() ? 'red' : 'initial' }}
                        />
                        <Typography style={{ paddingLeft: 3 }}>
                          {post.votes.length}
                        </Typography>
                      </IconButton>
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
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6">Comments:</Typography>
            </Grid>
            <Grid item>
              <Grid container>
                {!post.closed && userId && (
                  <TextFieldWrapper>
                    <SendButton onClick={handleAddComment}>
                      <SendIcon />
                    </SendButton>
                    <TextField
                      placeholder="Add Comment..."
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
                )}
                {post.comments.map(comment => (
                  <Comment
                    postCreatorId={post.createdBy.userId}
                    postId={post.postId}
                    closed={post.closed}
                    {...comment}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Card>
      <Dialog
        maxWidth="xl"
        open={isImgModalOpen}
        scroll="body"
        onClose={() => setImgModalOpen(false)}
      >
        <img src={postPicturePath(normalizeImagePath(modalPhoto) as string)} />
      </Dialog>

      <GenericDialog
        title="Edit post"
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        isBig={true}
      >
        <AddPostForm
          title={post?.title}
          content={post?.content}
          existingTags={post?.tags}
          existingCategory={post?.category}
          postId={postId}
          onClose={() => {
            setEditDialogOpen(false)
            setAnchorEl(null)
          }}
        />
      </GenericDialog>
      <Menu open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
        <MenuItem onClick={() => setEditDialogOpen(true)}>Edit post</MenuItem>
        <MenuItem onClick={handleDeletePost}>Delete post</MenuItem>
      </Menu>
    </Wrapper>
  )
}
