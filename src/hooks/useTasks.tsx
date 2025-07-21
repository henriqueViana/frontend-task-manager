import { useNavigate } from "react-router-dom";
import { useStore } from "./useStore";

export const useTasks = () => {
  const { tasks } = useStore();
  const navigate = useNavigate();

  const redirectToCreateTask = () => navigate("/tarefas/cadastro");

  const redirectToEditTask = (taskId: string) =>
    navigate(`/tarefas/cadastro/${taskId}`);

  const getTaskById = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    return task ? { ...task } : null;
  };

  return {
    tasks,
    redirectToCreateTask,
    redirectToEditTask,
    getTaskById,
  };
};
