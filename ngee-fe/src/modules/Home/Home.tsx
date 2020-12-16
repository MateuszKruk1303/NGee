import { TextField, Typography, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts, searchPosts } from '../../store/posts/thunks'
import { checkIsBanned } from '../../store/login/thunks'
import { RootState } from '../../store/types'
import { Wrapper, Button, SearchContainer, SearchButton } from './Home.style'
import PostContainer from './PostContainer'
import { Pagination } from '@material-ui/lab'
import GenericDialog from '../../components/GenericDialog'
import AddPostForm from './AddNewPost'
import RegisterDialog from '../LoginAndRegister'
import SpinnerLoader from '../../components/SpinnerLoader'
import Snackbar from '../../components/Snackbar'
import SearchIcon from '@material-ui/icons/Search'

export default () => {
  const dispatch = useDispatch()

  const posts = useSelector((state: RootState) => state.post.posts)
  const isLoading = useSelector((state: RootState) => state.post.isLoading)
  const message = useSelector((state: RootState) => state.login.message)
  const errorLogin = useSelector((state: RootState) => state.login.error)
  const errorPost = useSelector((state: RootState) => state.post.error)

  const userId = useSelector((state: RootState) => state.login.userId)
  const numberOfPosts = useSelector(
    (state: RootState) => state.post.numberOfPosts
  )
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isLoginDialogOpened, setLoginDialogOpen] = useState(false)
  const [keyWord, setKeyWord] = useState('')
  const [isSearching, setSearching] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getAllPosts({ dto: { actualPage: 1 } }))
    if (userId) dispatch(checkIsBanned({ dto: { userId } }))
  }, [getAllPosts, checkIsBanned])

  return (
    <Wrapper>
      <SpinnerLoader isLoading={isLoading} />
      <SearchContainer>
        <TextField
          value={keyWord}
          variant="outlined"
          onChange={e => setKeyWord(e.target.value)}
          placeholder="Search post"
          InputProps={{ startAdornment: <SearchIcon /> }}
        ></TextField>
        <SearchButton
          variant="contained"
          onClick={() => {
            setSearching(true)
            dispatch(searchPosts({ dto: { keyWord, actualPage: 1 } }))
            setPage(1)
          }}
        >
          <Typography>Search</Typography>
        </SearchButton>
        {isSearching && (
          <SearchButton
            variant="contained"
            onClick={() => {
              setSearching(false)
              dispatch(getAllPosts({ dto: { actualPage: 1 } }))
            }}
          >
            <Typography>Clear</Typography>
          </SearchButton>
        )}
      </SearchContainer>
      {message && <Snackbar message={message} isError={false} />}
      {errorLogin && <Snackbar message={errorLogin} isError={true} />}
      {errorPost && <Snackbar message={errorPost} isError={true} />}
      {userId ? (
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          <Typography>Do you have a problem? Ask the question!</Typography>
        </Button>
      ) : (
        <Button variant="contained" onClick={() => setLoginDialogOpen(true)}>
          <Typography>Login to as the question!</Typography>
        </Button>
      )}
      {posts && (
        <>
          {' '}
          <PostContainer posts={posts} />{' '}
        </>
      )}
      {isSearching ? (
        <Pagination
          style={{ marginTop: 5 }}
          count={Math.ceil(numberOfPosts / 10)}
          page={page}
          onChange={(e, page) => {
            setPage(page)
            dispatch(
              searchPosts({ dto: { keyWord: keyWord, actualPage: page } })
            )
          }}
        ></Pagination>
      ) : (
        <Pagination
          style={{ marginTop: 5 }}
          count={Math.ceil(numberOfPosts / 10)}
          page={page}
          onChange={(e, page) => {
            setPage(page)
            dispatch(getAllPosts({ dto: { actualPage: page } }))
          }}
        ></Pagination>
      )}

      <GenericDialog
        title="Ask your question"
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        isBig={true}
        disableBackdropClick
      >
        <AddPostForm onClose={() => setDialogOpen(false)} />
      </GenericDialog>
      <RegisterDialog
        open={isLoginDialogOpened}
        onClose={() => setLoginDialogOpen(false)}
      />
    </Wrapper>
  )
}
