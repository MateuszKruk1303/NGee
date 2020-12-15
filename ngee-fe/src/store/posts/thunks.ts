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
  { rejectValue: string }
>('getAllPosts', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.getAllPosts(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const getPostById = createAsyncThunk<
  { response: IGetPostByIdResponse },
  { dto: { postId: string } },
  { rejectValue: string }
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
  { rejectValue: string }
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
  { rejectValue: string }
>('addVote', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.addVote(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const editPost = createAsyncThunk<
  { response: { data: { title: string; content: string } } },
  { dto: { postId: string; userId: string; content: string; title: string } },
  { rejectValue: string }
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
  { rejectValue: string }
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
  { rejectValue: string }
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
  { rejectValue: string }
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
  { rejectValue: string }
>('tagAsSolution', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.tagAsSolution(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
