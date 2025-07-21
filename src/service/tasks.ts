import { api } from "../config/api"
import type { TaskType } from "../store/tasksSlice"

type GetTasksType = {
  userId: string
}

type CreateTaskType = {
  userId: string
  body: {
    items: TaskType[]
  }
}

export const getTasks = async ({ userId }: GetTasksType) => {
  return await api.get(`/tasks?userId=${userId}`)
}

export const createTask = async ({ userId, body }: CreateTaskType) => {
  return await api.patch(`/tasks/${userId}`, body)
}

export const updateTask = async ({ userId, body }: CreateTaskType) => {
  return await api.patch(`/tasks/${userId}`, body)
}

export const deleteTask = async ({ userId, body }: CreateTaskType) => {
  return await api.patch(`/tasks/${userId}`, body)
}

