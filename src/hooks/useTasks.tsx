import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "./useStore";
import { useAuth } from "../context/AuthContext";
import * as service from "../service/tasks";
import {
  addTask,
  removeTask,
  updateTask,
  type TaskType,
} from "../store/tasksSlice";
import { useToasty } from "./useToast";

type UseTasksType = {
  tasks: TaskType[];
  redirectToCreateTask: () => void;
  redirectToEditTask: (taskId: string) => void;
  getTaskById: (taskId: string) => TaskType | null;
  editTask: (task: TaskType) => void;
  createNewTask: (task: TaskType) => void;
  deleteTask: (taskId: string) => void;
};

export const useTasks = (): UseTasksType => {
  const dispatch = useDispatch();
  const { tasks } = useStore();
  const { user } = useAuth();
  const { success, error } = useToasty();

  const navigate = useNavigate();

  const redirectToCreateTask = () => navigate("/tarefas/cadastro");

  const redirectToEditTask = (taskId: string) =>
    navigate(`/tarefas/cadastro/${taskId}`);

  const getTaskById = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    return task ? { ...task } : null;
  };

  const editTask = (task: TaskType) => {
    const updatedItems = tasks.map((item: TaskType) =>
      item.id === task.id ? { ...task } : item
    );

    const body = {
      items: updatedItems,
    };

    try {
      service.updateTask({
        userId: user.id,
        body,
      });

      dispatch(updateTask(task));
      success("Tarefa editada com sucesso!");
    } catch (e) {
      error("Erro ao editar a tarefa!");
    }
  };

  const createNewTask = (task: TaskType) => {
    task.id = uuidv4();

    const body = {
      items: [...tasks, task],
    };

    try {
      service.createTask({
        userId: user.id,
        body,
      });

      dispatch(addTask(task));
      success("Tarefa criada com sucesso!");
    } catch (e) {
      error("Tarefa criada com sucesso!");
    }
  };

  const deleteTask = (taskId: string) => {
    const updatedItems = tasks.filter((item: TaskType) => item.id !== taskId);

    const body = {
      items: updatedItems,
    };

    try {
      service.deleteTask({
        userId: user.id,
        body,
      });

      dispatch(removeTask(taskId));
      success("Tarefa deletada com sucesso!");
    } catch (e) {
      error("Erro ao deletar a tarefa!");
    }
  };

  return {
    tasks,
    redirectToCreateTask,
    redirectToEditTask,
    getTaskById,
    editTask,
    createNewTask,
    deleteTask,
  };
};
