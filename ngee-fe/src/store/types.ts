export interface IInitialLoginState {
  name: string | null
  userId: string | null
  profilePicture: string | null
  isLoading: boolean
  error: string | null
}

export interface IInitialPostState {
  posts: Post[] | null
  post: Post | null
  numberOfPosts: number
  isLoading: boolean
  error: string | null
}

export interface User {
  userId: string
  _id: string
  name: string
  photo: string
}

export interface Comment {
  votes: []
  commentId: string
  _id: string
  content: string
  createdBy: User
  solution: boolean
}

export interface Post {
  photos: []
  votes: []
  tags: []
  postId: string
  title: string
  content: string
  category: string
  createdBy: User
  comments: Comment[]
  createDate: Date
  closed: boolean
}

export interface RootState {
  login: IInitialLoginState
  post: IInitialPostState
}
