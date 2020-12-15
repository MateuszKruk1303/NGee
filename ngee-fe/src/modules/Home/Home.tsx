import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../store/posts/thunks'
import { RootState } from '../../store/types'
import { Wrapper, Button } from './Home.style'
import PostContainer from './PostContainer'
import { Pagination } from '@material-ui/lab'
import GenericDialog from '../../components/GenericDialog'
import AddPostForm from './AddNewPost'

export default () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPosts({ dto: { actualPage: 1 } }))
  }, [getAllPosts])

  const posts = useSelector((state: RootState) => state.post.posts)
  const numberOfPosts = useSelector(
    (state: RootState) => state.post.numberOfPosts
  )
  const [isDialogOpen, setDialogOpen] = useState(false)

  return (
    <Wrapper>
      <Button variant="contained" onClick={() => setDialogOpen(true)}>
        <Typography>Do you have a problem? Ask the question!</Typography>
      </Button>
      {posts && <PostContainer posts={posts} />}
      <Pagination
        count={Math.ceil(numberOfPosts / 10)}
        onChange={(e, page) => {
          console.log(page)
          dispatch(getAllPosts({ dto: { actualPage: page } }))
        }}
      ></Pagination>
      <GenericDialog
        title="Ask your question"
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        isBig={true}
      >
        <AddPostForm onClose={() => setDialogOpen(false)} />
      </GenericDialog>
    </Wrapper>
  )
}
