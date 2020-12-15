import { createReducer, createAction } from '@reduxjs/toolkit'
import { IInitialPostState } from '../types'
import {
  getAllPosts,
  addNewPost,
  getPostById,
  addVote,
  editPost,
  deletePost,
  addComment,
  addVoteToComment,
  tagAsSolution,
} from './thunks'

const initialPostState: IInitialPostState = {
  posts: null,
  numberOfPosts: 0,
  post: null,
  isLoading: false,
  error: null,
}

export default createReducer(initialPostState, builder => {
  builder
    .addCase(getAllPosts.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getAllPosts.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.numberOfPosts = payload.response.numberOfPosts
      state.posts = payload.response.data.map(post => ({
        ...post,
        postId: post._id,
        createDate: new Date(post.createDate),
        _id: null,
      }))
    })
    .addCase(getAllPosts.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(addNewPost.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(addNewPost.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.posts?.unshift({
        ...payload.response.data,
        postId: payload.response.data._id,
      })
    })
    .addCase(addNewPost.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(getPostById.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getPostById.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      console.log(payload.response.data)
      state.post = {
        ...payload.response.data,
        postId: payload.response.data._id,
        createDate: new Date(payload.response.data.createDate),
        comments: payload.response.data.comments.map(comment => ({
          ...comment,
          commentId: comment._id,
        })),
      }
    })
    .addCase(getPostById.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(addVote.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(addVote.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.post!.votes = payload.response.data.votes as []
    })
    .addCase(addVote.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(addComment.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(addComment.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.post?.comments.push(payload.response.data)
    })
    .addCase(addComment.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(addVoteToComment.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(addVoteToComment.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.post?.comments.forEach(comment => {
        if (comment.commentId === payload.response.data.commentId)
          comment.votes = payload.response.data.votes
      })
    })
    .addCase(addVoteToComment.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(tagAsSolution.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(tagAsSolution.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.post!.closed = true
      state.post?.comments.map(comment => {
        if (comment.commentId === payload.response.data.commentId)
          comment.solution = true
      })
    })
    .addCase(tagAsSolution.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
})
