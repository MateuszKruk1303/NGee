export interface IinitialLoginState {
  name: string | null
  userId: string | null
  isLoading: boolean
  error: string | null
}

export interface RootState {
  login: IinitialLoginState
}
