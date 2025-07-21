import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type TaskType = {
  id: string
  title: string
  description: string
  category: string
  priority: string
  status: string
}

export type FilterType = {
  category?: string
  status?: string
  priority?: string
}

const initialState = {
  tasks: [] as TaskType[],
  filters: {
    category: '', status: '', priority: ''
  } as FilterType
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskType | TaskType[]>) => {
      const tasksToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      state.tasks.push(...tasksToAdd)
    },
    updateTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? { ...action.payload } : task
      );
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateFilters: (state, action: PayloadAction<Partial<FilterType>>) => {
      state.filters = {...state.filters, ...action.payload}
    }
  }
})

export const { addTask, updateTask, removeTask, updateFilters } = tasksSlice.actions
export default tasksSlice.reducer