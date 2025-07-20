import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useStore } from "./useStore";
import { useEffect } from "react";
import { getTasks } from "../service/tasks";
import { addTask, type TaskType } from "../store/tasksSlice";

export const useDashboard = () => {
  const chartColors = ["#3b82f6", "#f97316", "#10b981"];

  const { tasks } = useStore();
  const { user } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    if (tasks.length > 0 || !user.id) return;

    const fetchTasks = async () => {
      const tasksData = await getTasks({ userId: user.id });
      dispatch(addTask(tasksData.data[0]?.items || []));
    };

    fetchTasks();
  }, [tasks.length, dispatch]);

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter((task) => task.status === "Concluído")?.length || 0;

  const pendingTasks = totalTasks - completedTasks;

  const categoryData = groupByType(tasks, "category");
  const statusData = groupByType(tasks, "status");

  return {
    chartColors,
    categoryData,
    statusData,
    completedTasks,
    pendingTasks,
  };
};

const groupByType = (tasks: TaskType[], type: keyof TaskType) => {
  const result = tasks.reduce<Record<string, number>>((acc, task) => {
    acc[task[type]] = (acc[task[type]] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(result).map(([name, value]) => ({
    name,
    value,
  }));
};
