import { useCallback, type FormEvent } from "react";
import { type TaskType } from "../store/tasksSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useTasks } from "./useTasks";

type UseRegisterType = {
  updateFieldRegister: (field: keyof TaskType, value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
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
  const navigate = useNavigate();
  const { getTaskById, editTask, createNewTask } = useTasks();

  const taskIdPath = extractTaskIdOfPath();
  task = getTaskById(taskIdPath) || task;

  const updateFieldRegister = useCallback(
    (field: keyof TaskType, value: string) => {
      task[field] = value;
    },
    []
  );

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (task.id) {
      editTask(task);
      navigate("/tarefas");
      return;
    }

    createNewTask(task);
    navigate("/tarefas");
    return;
  }, []);

  return {
    updateFieldRegister,
    handleSubmit,
    task,
  };
};
