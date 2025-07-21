import { useCallback, type FormEvent } from "react";
import {
  addTask,
  removeTask,
  updateTask,
  type TaskType,
} from "../store/tasksSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import * as service from "../service/tasks";
import { useStore } from "./useStore";
import { useDispatch } from "react-redux";
import { useTasks } from "./useTasks";

type UseRegisterType = {
  updateFieldRegister: (field: keyof TaskType, value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  deleteTask: (taskId: string) => void;
  task: TaskType;
};

let task: TaskType = {
  category: "",
  description: "",
  priority: "",
  id: "",
  status: "",
  title: "",
};

const extractTaskIdOfPath = () => {
  const location = useLocation();
  return location.pathname.split("/").pop() || "";
};

export const useRegister = (): UseRegisterType => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks } = useStore();
  const { getTaskById } = useTasks();

  const taskIdPath = extractTaskIdOfPath();
  task = getTaskById(taskIdPath) || task;

  const updateFieldRegister = useCallback(
    (field: keyof TaskType, value: string) => {
      task[field] = value;
    },
    []
  );

  const editTask = () => {
    const updatedItems = tasks.map((item: TaskType) =>
      item.id === task.id ? { ...task } : item
    );

    const body = {
      items: updatedItems,
    };

    dispatch(updateTask(task));

    service.updateTask({
      userId: user.id,
      body,
    });

    navigate("/tarefas");
  };

  const createNewTask = () => {
    task.id = uuidv4();

    const body = {
      items: [...tasks, task],
    };

    dispatch(addTask(task));

    service.createTask({
      userId: user.id,
      body,
    });
  };

  const deleteTask = (taskId: string) => {
    const updatedItems = tasks.filter((item: TaskType) => item.id !== taskId);

    const body = {
      items: updatedItems,
    };

    dispatch(removeTask(taskId));

    service.deleteTask({
      userId: user.id,
      body,
    });

    navigate("/tarefas");
  };

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (task.id) {
      editTask();
      navigate("/tarefas");
      return;
    }

    createNewTask();
    navigate("/tarefas");
  }, []);

  return {
    updateFieldRegister,
    handleSubmit,
    deleteTask,
    task,
  };
};
