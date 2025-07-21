import { useRegister } from "../../../hooks/useRegister";
import { useTasks } from "../../../hooks/useTasks";
import type { TaskType } from "../../../store/tasksSlice";

type TaskItemType = {
  task: TaskType;
};

const TaskItem = ({ task }: TaskItemType) => {
  const { redirectToEditTask } = useTasks();
  const { deleteTask } = useRegister();

  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow p-4 mb-2">
      <span className="font-medium text-gray-800">{task.title}</span>
      <div className="flex gap-2">
        <button
          onClick={() => redirectToEditTask(task.id)}
          className="px-3 py-1 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
