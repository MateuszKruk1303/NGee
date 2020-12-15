import React from 'react'
import { Post as PostType } from '../../../store/types'
import Post from './Post'

interface IPostContainer {
  posts: PostType[]
}

export default ({ posts }: IPostContainer) => {
  return (
    <div>{posts && posts.map(post => <Post id={post.postId} {...post} />)}</div>
  )
}
