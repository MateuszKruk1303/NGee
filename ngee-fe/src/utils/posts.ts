import { AxiosInstance } from 'axios'

const apiPaths = {
  addNewPost: '/posts/addpost',
  getPost: '/posts/post',
  addComment: '/posts/addcomment',
  getAllPosts: '/posts/allposts',
  getUserPosts: '/posts/userposts',
  searchPosts: '/posts/searchposts',
  addVote: '/posts/addvote',
  editPost: '/posts/editpost',
  deletePost: '/posts/deletepost',
  addVoteToComment: '/posts/addcommentvote',
  addCommentToPost: '/posts/addcomment',
  editComment: '/posts/editcomment',
  deleteComment: '/posts/deletecomment',
  tagAsSolution: '/posts/tagassolution',
}

const headers = {
  'Content-Type': 'multipart/form-data',
}

export const postApi = (
  axiosInstance: AxiosInstance,
  axiosInstanceAuth: AxiosInstance
) => ({
  async getAllPosts(data: { actualPage: number }) {
    return axiosInstance.post(apiPaths.getAllPosts, data)
  },
  async getUserPosts(data: { actualPage: number; userId: string }) {
    return axiosInstanceAuth.post(apiPaths.getUserPosts, data)
  },
  async searchPosts(data: {
    category: string
    keyWord: string
    actualPage: number
  }) {
    return axiosInstance.post(apiPaths.searchPosts, data)
  },
  async addNewPost(data: FormData) {
    return axiosInstanceAuth.post(apiPaths.addNewPost, data, { headers })
  },
  async getPostById(data: { postId: string }) {
    return axiosInstance.post(apiPaths.getPost, data)
  },
  async addVote(data: { postId: string; userId: string }) {
    return axiosInstanceAuth.post(apiPaths.addVote, data)
  },
  async addComment(data: { content: string; userId: string; postId: string }) {
    return axiosInstanceAuth.post(apiPaths.addCommentToPost, data)
  },
  async addCommentVote(data: { commentId: string; userId: string }) {
    return axiosInstanceAuth.post(apiPaths.addVoteToComment, data)
  },
  async editComment(data: {
    commentId: string
    userId: string
    postId: string
    content: string
  }) {
    return axiosInstanceAuth.post(apiPaths.editComment, data)
  },
  async deleteComment(data: {
    commentId: string
    userId: string
    postId: string
  }) {
    return axiosInstanceAuth.post(apiPaths.deleteComment, data)
  },
  async deletePost(data: { postId: string; userId: string }) {
    return axiosInstanceAuth.post(apiPaths.deletePost, data)
  },
  async tagAsSolution(data: {
    postId: string
    commentId: string
    userId: string
  }) {
    return axiosInstanceAuth.post(apiPaths.tagAsSolution, data)
  },
  async editPost(data: {
    postId: string
    userId: string
    content: string
    title: string
    category: string
    tags: string[]
  }) {
    return axiosInstanceAuth.post(apiPaths.editPost, data)
  },
})
