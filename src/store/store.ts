import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
})

export type StateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch