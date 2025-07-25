import { useCallback, type FormEvent } from "react";
import { type TaskType } from "../store/tasksSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useTasks } from "./useTasks";

type UseRegisterType = {
  updateFieldRegister: (field: keyof TaskType, value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  task: TaskType;
  priorityOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: string }[];
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

const priorityOptions = [
  { label: "Alta", value: "Alta" },
  { label: "Média", value: "Média" },
  { label: "Baixa", value: "Baixa" },
];

const statusOptions = [
  { label: "Pendente", value: "Pendente" },
  { label: "Em Progresso", value: "Em Progresso" },
  { label: "Concluído", value: "Concluído" },
];

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

  const handleSubmit = useCallback((data: any) => {
    if (data.id) {
      editTask(data);
      navigate("/tarefas");
      return;
    }

    createNewTask(data);
    navigate("/tarefas");
    return;
  }, []);

  return {
    updateFieldRegister,
    handleSubmit,
    task,
    priorityOptions,
    statusOptions,
  };
};
