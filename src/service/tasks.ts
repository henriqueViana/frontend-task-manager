import { api } from "../config/api"

type GetTasksType = {
  userId: string
}

export const getTasks = async ({ userId }: GetTasksType) => {
  return await api.get(`/tasks?userId=${userId}`)
}

