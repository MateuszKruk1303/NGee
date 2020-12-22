import { TextField, Typography, Grid, MenuItem } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts, searchPosts } from '../../store/posts/thunks'
import { checkIsBanned } from '../../store/login/thunks'
import { RootState } from '../../store/types'
import {
  Wrapper,
  Button,
  SearchContainer,
  SearchButton,
  Select,
} from './Home.style'
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
  const [keyWord, setKeyWord] = useState<string>('')
  const [category, setCategory] = useState<string>('')
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
        <div>
          <Typography>Szukaj w kategorii</Typography>
          <Select
            variant="outlined"
            placeholder="Kategoria"
            value={category}
            onChange={e => setCategory(e.target.value as string)}
          >
            <MenuItem value="">Brak</MenuItem>
            <MenuItem value="Automatyka">Automatyka</MenuItem>
            <MenuItem value="Robotyka">Robotyka</MenuItem>
            <MenuItem value="Studia">Studia</MenuItem>
            <MenuItem value="Inne">Inne</MenuItem>
          </Select>
        </div>
        <div>
          <Typography>Szukaj po frazie</Typography>
          <TextField
            value={keyWord}
            variant="outlined"
            onChange={e => setKeyWord(e.target.value)}
            placeholder="Fraza"
            InputProps={{ startAdornment: <SearchIcon /> }}
          ></TextField>
        </div>
        <SearchButton
          variant="contained"
          onClick={() => {
            setSearching(true)
            dispatch(searchPosts({ dto: { category, keyWord, actualPage: 1 } }))
            setPage(1)
          }}
        >
          <Typography>Szukaj</Typography>
        </SearchButton>
        {isSearching && (
          <SearchButton
            variant="contained"
            onClick={() => {
              setSearching(false)
              setCategory('')
              setKeyWord('')
              dispatch(getAllPosts({ dto: { actualPage: 1 } }))
            }}
          >
            <Typography>Zakończ</Typography>
          </SearchButton>
        )}
      </SearchContainer>
      {message && <Snackbar message={message} isError={false} />}
      {errorLogin && <Snackbar message={errorLogin} isError={true} />}
      {errorPost && <Snackbar message={errorPost} isError={true} />}
      {userId ? (
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          <Typography>Masz problem? Zadaj pytanie</Typography>
        </Button>
      ) : (
        <Button variant="contained" onClick={() => setLoginDialogOpen(true)}>
          <Typography>Zaloguj się aby zadać pytanie</Typography>
        </Button>
      )}
      <Typography variant="h6">
        {isSearching ? 'Wyniki wyszukiwania' : 'Najnowsze posty'}
      </Typography>
      {posts && (
        <>
          <PostContainer posts={posts} />
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
              searchPosts({
                dto: { category, keyWord: keyWord, actualPage: page },
              })
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
        title="Dodaj post"
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
