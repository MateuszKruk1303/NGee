import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import {
  Wrapper,
  Avatar,
  ChooseFile,
  Button,
  Grid,
  TextField,
  AdminPanel,
} from './UserProfile.style'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, banUser } from '../../store/login/thunks'
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
  const [userToBan, setUserToBan] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()

  const {
    userId,
    name,
    profilePicture,
    message,
    error,
    isLoading,
    isAdmin,
  } = useSelector((state: RootState) => state.login)

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

  const handleBanUser = () => {
    dispatch(
      banUser({ dto: { name: userToBan, adminPassword: adminPassword } })
    )
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
            title="Zmień zdjęcie profilowe"
            actionTitle="Kliknij aby zmienić zdjęcie"
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
            title="Zmień swój e-mail"
            actionsAvailable={false}
          >
            <Button
              variant="contained"
              onClick={() => {
                setEmailChangeDialog(true)
              }}
            >
              <Typography variant="body2">
                Kliknij aby zmienić swój e-mail
              </Typography>
            </Button>
          </ProfileActionsCard>
        </Grid>
        <Grid item>
          <ProfileActionsCard title="Zmień hasło" actionsAvailable={false}>
            <Button
              variant="contained"
              onClick={() => {
                setPasswordChangeDialog(true)
              }}
            >
              <Typography variant="body2">Kliknij aby zmienić hasło</Typography>
            </Button>
          </ProfileActionsCard>
        </Grid>
        <Grid item>
          <ProfileActionsCard
            title="Zmień swoją nazwę użytkownika"
            actionsAvailable={false}
          >
            <Button
              variant="contained"
              onClick={() => {
                setNicknameChangeDialog(true)
              }}
            >
              <Typography variant="body2">Kliknij aby zmienić nazwę</Typography>
            </Button>
          </ProfileActionsCard>
        </Grid>
        <Grid item>
          <ProfileActionsCard title="Usuń swoje konto" actionsAvailable={false}>
            <Button
              variant="contained"
              onClick={() => {
                setDeleteAccountDialog(true)
              }}
            >
              <Typography variant="body2">
                Kliknij aby usunąć swoje konto
              </Typography>
            </Button>
          </ProfileActionsCard>
        </Grid>
        <Grid item>
          {isAdmin && (
            <AdminPanel>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography variant="h6">Zablokuj użytkownika</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    placeholder="Nazwa użytkownika"
                    value={userToBan}
                    variant="outlined"
                    onChange={e => {
                      setUserToBan(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    placeholder="Hasło administratora"
                    type="password"
                    variant="outlined"
                    value={adminPassword}
                    onChange={e => {
                      setAdminPassword(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleBanUser}>
                    Zablokuj użytkownika
                  </Button>
                </Grid>
              </Grid>
            </AdminPanel>
          )}
        </Grid>
      </Grid>
      <PostWrapper>
        <Typography variant="h6">Twoje posty: </Typography>
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
            Nie dodano jeszcze żadnych postów
          </Typography>
        )}
      </PostWrapper>
      <GenericDialog
        open={emailChangeDialog}
        onClose={() => {
          setEmailChangeDialog(false)
        }}
        title="Zmień swój e-mail"
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
        title="Zmień swoje hasło"
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
        title="Zmień nazwę użytkownika"
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
        title="Usuń swoje konto"
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
