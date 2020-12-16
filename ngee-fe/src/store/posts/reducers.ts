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
  editComment,
  deleteComment,
  searchPosts,
  getUserPosts,
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
      if (payload) state.error = payload.response.data.error
    })
    .addCase(getUserPosts.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getUserPosts.fulfilled, (state, { payload }) => {
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
    .addCase(getUserPosts.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
    .addCase(searchPosts.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(searchPosts.fulfilled, (state, { payload }) => {
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
    .addCase(searchPosts.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
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
      if (payload) state.error = payload.response.data.error
    })
    .addCase(getPostById.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getPostById.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.post = {
        ...payload.response.data,
        postId: payload.response.data._id,
        createdBy: {
          ...payload.response.data.createdBy,
          userId: payload.response.data.createdBy._id,
        },
        createDate: new Date(payload.response.data.createDate),
        comments: payload.response.data.comments.map(comment => ({
          ...comment,
          createDate: new Date(comment.createDate),
          commentId: comment._id,
          createdBy: { ...comment.createdBy, userId: comment.createdBy._id },
        })),
      }
    })
    .addCase(getPostById.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
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
      if (payload) state.error = payload.response.data.error
    })
    .addCase(addComment.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(addComment.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.post?.comments.push({
        ...payload.response.data,
        createDate: new Date(payload.response.data.createDate),
        createdBy: {
          ...payload.response.data.createdBy,
          userId: payload.response.data.createdBy._id,
        },
        commentId: payload.response.data._id,
      })
    })
    .addCase(addComment.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
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
      if (payload) state.error = payload.response.data.error
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
      if (payload) state.error = payload.response.data.error
    })
    .addCase(deletePost.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(deletePost.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      window.location.replace('/')
    })
    .addCase(deletePost.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
    .addCase(editPost.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(editPost.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.post!.content = payload.response.data.content
      state.post!.title = payload.response.data.title
      state.post!.category = payload.response.data.category
      state.post!.tags = payload.response.data.tags as []
    })
    .addCase(editPost.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
    .addCase(editComment.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(editComment.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.post!.comments.map(comment => {
        if (comment.commentId === payload.response.data.commentId)
          comment.content = payload.response.data.content
      })
    })
    .addCase(editComment.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
    .addCase(deleteComment.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.post!.comments.map((comment, index) => {
        if (comment.commentId === payload.response.data.commentId)
          state.post!.comments.splice(index, 1)
      })
    })
    .addCase(deleteComment.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
})
