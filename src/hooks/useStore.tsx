import { useSelector } from "react-redux";
import { type StateType } from "../store/store";
import { type FilterType, type TaskType } from "../store/tasksSlice";

type UseStoreType = {
  tasks: TaskType[];
  filters: FilterType;
};

export const useStore = (): UseStoreType => {
  const tasks = useSelector((state: StateType) => state.tasks.tasks);
  const filters = useSelector((state: StateType) => state.tasks.filters);

  return {
    tasks,
    filters,
  };
};
