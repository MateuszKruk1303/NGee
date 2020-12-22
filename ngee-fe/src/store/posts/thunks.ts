import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'
import { Comment, User } from '../types'

interface PostResponseSchema {
  photos: []
  votes: []
  tags: []
  _id: string
  title: string
  content: string
  category: string
  createdBy: User
  comments: Comment[]
  closed: boolean
  createDate: Date
}

interface IGetAllPostsResponse {
  data: PostResponseSchema[]
  numberOfPosts: number
}

interface IGetPostByIdResponse {
  data: PostResponseSchema
}

interface IAddPostResponse {
  data: PostResponseSchema
}

export const getAllPosts = createAsyncThunk<
  { response: IGetAllPostsResponse },
  { dto: { actualPage: number } },
  { rejectValue: any }
>('getAllPosts', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.getAllPosts(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const getUserPosts = createAsyncThunk<
  { response: IGetAllPostsResponse },
  { dto: { actualPage: number; userId: string } },
  { rejectValue: any }
>('getUserPosts', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.getUserPosts(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const searchPosts = createAsyncThunk<
  { response: IGetAllPostsResponse },
  { dto: { category: string; keyWord: string; actualPage: number } },
  { rejectValue: any }
>('searchPosts', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.searchPosts(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const getPostById = createAsyncThunk<
  { response: IGetPostByIdResponse },
  { dto: { postId: string } },
  { rejectValue: any }
>('getPostById', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.getPostById(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const addNewPost = createAsyncThunk<
  { response: IAddPostResponse },
  { dto: FormData },
  { rejectValue: any }
>('addNewPost', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.addNewPost(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const addVote = createAsyncThunk<
  { response: { data: { votes: [] } } },
  { dto: { postId: string; userId: string } },
  { rejectValue: any }
>('addVote', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.addVote(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const editPost = createAsyncThunk<
  {
    response: {
      data: { title: string; content: string; category: string; tags: string[] }
    }
  },
  {
    dto: {
      postId: string
      userId: string
      content: string
      title: string
      category: string
      tags: string[]
    }
  },
  { rejectValue: any }
>('editPost', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.editPost(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const deletePost = createAsyncThunk<
  { response: { data: string } },
  { dto: { postId: string; userId: string } },
  { rejectValue: any }
>('deletePost', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.deletePost(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const addComment = createAsyncThunk<
  { response: { data: Comment; postId: string } },
  { dto: { postId: string; userId: string; content: string } },
  { rejectValue: any }
>('addComment', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.addComment(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const addVoteToComment = createAsyncThunk<
  { response: { data: { votes: []; commentId: string } } },
  { dto: { commentId: string; userId: string } },
  { rejectValue: any }
>('addVoteToComment', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.addCommentVote(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const tagAsSolution = createAsyncThunk<
  { response: { data: { commentId: string; postId: string } } },
  { dto: { postId: string; commentId: string; userId: string } },
  { rejectValue: any }
>('tagAsSolution', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.tagAsSolution(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const editComment = createAsyncThunk<
  {
    response: { data: { commentId: string; content: string } }
  },
  {
    dto: { commentId: string; userId: string; postId: string; content: string }
  },
  { rejectValue: any }
>('editComment', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.editComment(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const deleteComment = createAsyncThunk<
  {
    response: { data: { commentId: string } }
  },
  {
    dto: { commentId: string; userId: string; postId: string }
  },
  { rejectValue: any }
>('deleteComment', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.deleteComment(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
