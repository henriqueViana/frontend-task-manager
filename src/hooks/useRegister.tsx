import { useCallback, type FormEvent } from "react";
import type { TaskType } from "../store/tasksSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

type UseRegisterType = {
  updateFieldRegister: (field: keyof TaskType, value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const task: TaskType = {
  category: "",
  description: "",
  priority: "",
  id: "",
  status: "",
  title: "",
};

export const useRegister = (): UseRegisterType => {
  const navigate = useNavigate();

  const updateFieldRegister = useCallback(
    (field: keyof TaskType, value: string) => {
      task[field] = value;
    },
    []
  );

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    task.id = uuidv4();
    console.log("event form", task);
    //navigate("/tarefa");
  }, []);

  return {
    updateFieldRegister,
    handleSubmit,
  };
};
