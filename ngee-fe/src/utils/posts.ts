import { AxiosInstance } from 'axios'

const apiPaths = {
  addNewPost: '/posts/addpost',
  getPost: '/posts/post',
  addComment: '/posts/addcomment',
  getAllPosts: '/posts/allposts',
  addVote: '/posts/addvote',
  editPost: '/posts/editpost',
  deletePost: '/posts/deletepost',
  addVoteToComment: '/posts/addcommentvote',
  addCommentToPost: '/posts/addcomment',
  tagAsSolution: '/posts/tagassolution',
}

const headers = {
  'Content-Type': 'multipart/form-data',
}

export const postApi = (axiosInstance: AxiosInstance) => ({
  async getAllPosts(data: { actualPage: number }) {
    return axiosInstance.post(apiPaths.getAllPosts, data)
  },
  async addNewPost(data: FormData) {
    return axiosInstance.post(apiPaths.addNewPost, data, { headers })
  },
  async getPostById(data: { postId: string }) {
    return axiosInstance.post(apiPaths.getPost, data)
  },
  async addVote(data: { postId: string; userId: string }) {
    return axiosInstance.post(apiPaths.addVote, data)
  },
  async addComment(data: { content: string; userId: string; postId: string }) {
    return axiosInstance.post(apiPaths.addCommentToPost, data)
  },
  async addCommentVote(data: { commentId: string; userId: string }) {
    return axiosInstance.post(apiPaths.addVoteToComment, data)
  },
  async deletePost(data: { postId: string; userId: string }) {
    return axiosInstance.post(apiPaths.deletePost, data)
  },
  async tagAsSolution(data: {
    postId: string
    commentId: string
    userId: string
  }) {
    return axiosInstance.post(apiPaths.tagAsSolution, data)
  },
  async editPost(data: {
    postId: string
    userId: string
    title: string
    content: string
  }) {
    return axiosInstance.post(apiPaths.editPost, data)
  },
})
