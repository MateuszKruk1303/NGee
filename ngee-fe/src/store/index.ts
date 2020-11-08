import { configureStore, combineReducers } from '@reduxjs/toolkit'
import login from './login/reducers'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: combineReducers({ login: login }),
  middleware: [thunk],
})
