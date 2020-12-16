import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { Wrapper, Avatar, ChooseFile, Button, Grid } from './UserProfile.style'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, changeEmail } from '../../store/login/thunks'
import { getUserPosts } from '../../store/posts/thunks'
import { RootState } from '../../store/types'
import { formatDate } from './UserProfile.utils'
import ProfileActionsCard from './GenericProfileActionCard'
import ProfileActionForm from './GenericProfileActionForm'
import GenericDialog from '../../components/GenericDialog'
import SpinnerLoader from '../../components/SpinnerLoader'
import Snackbar from '../../components/Snackbar'
import PostContainer from '../Home/PostContainer'
import { Wrapper as PostWrapper } from '../Home/Home.style'

export default () => {
  const [selectedFile, setSelectedFile] = useState<null | File>(null)
  const [emailChangeDialog, setEmailChangeDialog] = useState(false)
  const [passwordChangeDialog, setPasswordChangeDialog] = useState(false)
  const [nicknameChangeDialog, setNicknameChangeDialog] = useState(false)
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false)
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootState) => state.login.isLoading)
  const message = useSelector((state: RootState) => state.login.message)
  const error = useSelector((state: RootState) => state.login.error)

  const { userId, name, profilePicture } = useSelector(
    (state: RootState) => state.login
  )

  const { posts, numberOfPosts } = useSelector((state: RootState) => state.post)

  useEffect(() => {
    if (userId) dispatch(getUserPosts({ dto: { actualPage: 1, userId } }))
  }, [getUserPosts])

  const handleUploadPhoto = () => {
    if (selectedFile && userId) {
      const fd = new FormData()
      fd.append(
        'profileimage',
        selectedFile,
        `${formatDate(new Date())}-${userId}-ProfilePicture`
      )
      fd.append('userId', userId)
      dispatch(uploadPhoto({ dto: fd }))
    }
  }
  return (
    <Wrapper>
      {message && <Snackbar message={message} isError={false} />}
      {error && <Snackbar message={error} isError={true} />}
      <SpinnerLoader isLoading={isLoading} />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <ProfileActionsCard title={name!} actionsAvailable={false}>
            <Avatar src={profilePicture ? profilePicture : ''}></Avatar>
          </ProfileActionsCard>
        </Grid>
        <Grid item>
          <ProfileActionsCard
            title="Change profile photo"
            actionTitle="Click to change your photo"
            actionsAvailable={true}
            onButtonClick={handleUploadPhoto}
            disabled={!selectedFile}
          >
            <ChooseFile
              type="file"
              onChange={e => {
                setSelectedFile(e.target.files![0])
              }}
              name="profileimage"
            ></ChooseFile>
          </ProfileActionsCard>
        </Grid>
        <Grid item>
          <ProfileActionsCard
            title="Change your email"
            actionsAvailable={false}
          >
            <Button
              variant="contained"
              onClick={() => {
                setEmailChangeDialog(true)
              }}
            >
              <Typography variant="body2">
                Click to change your email
              </Typography>
            </Button>
          </ProfileActionsCard>
        </Grid>
        <Grid item>
          <ProfileActionsCard
            title="Change your password"
            actionsAvailable={false}
          >
            <Button
              variant="contained"
              onClick={() => {
                setPasswordChangeDialog(true)
              }}
            >
              <Typography variant="body2">
                Click to change your password
              </Typography>
            </Button>
          </ProfileActionsCard>
        </Grid>
        <Grid item>
          <ProfileActionsCard
            title="Change your nickname"
            actionsAvailable={false}
          >
            <Button
              variant="contained"
              onClick={() => {
                setNicknameChangeDialog(true)
              }}
            >
              <Typography variant="body2">
                Click to change your nickname
              </Typography>
            </Button>
          </ProfileActionsCard>
        </Grid>
        <Grid item>
          <ProfileActionsCard
            title="Delete your account"
            actionsAvailable={false}
          >
            <Button
              variant="contained"
              onClick={() => {
                setDeleteAccountDialog(true)
              }}
            >
              <Typography variant="body2">
                Click to Delete your account
              </Typography>
            </Button>
          </ProfileActionsCard>
        </Grid>
      </Grid>
      <PostWrapper>
        <Typography variant="h6">Your posts: </Typography>
        {posts?.length ? (
          <>
            <PostContainer posts={posts} />
            <Pagination
              page={page}
              onChange={(e, page) => {
                setPage(page)
                if (userId)
                  dispatch(getUserPosts({ dto: { actualPage: page, userId } }))
              }}
              count={Math.ceil(numberOfPosts / 10)}
            />
          </>
        ) : (
          <Typography style={{ paddingTop: 20 }} variant="body1">
            You haven't added any post yet
          </Typography>
        )}
      </PostWrapper>
      <GenericDialog
        open={emailChangeDialog}
        onClose={() => {
          setEmailChangeDialog(false)
        }}
        title="Change your email"
      >
        <ProfileActionForm
          onClose={() => setEmailChangeDialog(false)}
          formType="emailChange"
          userId={userId!}
        />
      </GenericDialog>
      <GenericDialog
        open={passwordChangeDialog}
        onClose={() => {
          setPasswordChangeDialog(false)
        }}
        title="Change your password"
      >
        <ProfileActionForm
          onClose={() => setPasswordChangeDialog(false)}
          formType="passwordChange"
          userId={userId!}
        />
      </GenericDialog>
      <GenericDialog
        open={nicknameChangeDialog}
        onClose={() => {
          setNicknameChangeDialog(false)
        }}
        title="Change your nickname"
      >
        <ProfileActionForm
          onClose={() => setNicknameChangeDialog(false)}
          formType="nickChange"
          userId={userId!}
        />
      </GenericDialog>
      <GenericDialog
        open={deleteAccountDialog}
        onClose={() => {
          setDeleteAccountDialog(false)
        }}
        title="Delete your account"
      >
        <ProfileActionForm
          onClose={() => setDeleteAccountDialog(false)}
          formType="deleteAccount"
          userId={userId!}
        />
      </GenericDialog>
    </Wrapper>
  )
}
