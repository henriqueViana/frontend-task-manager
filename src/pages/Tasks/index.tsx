import TaskList from "../../components/Tasks/TaskList";
import Sidebar from "../../components/Sidebar";
import { useTasks } from "../../hooks/useTasks";

const TasksPage = () => {
  const { redirectToCreateTask } = useTasks();

  return (
    <section className="flex min-h-screen h-screen bg-gray-50">
      <Sidebar />
      <div className="p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-default-black">
            Minhas Tarefas
          </h1>
          <button
            onClick={redirectToCreateTask}
            className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
          >
            Nova Tarefa
          </button>
        </div>

        <TaskList />
      </div>
    </section>
  );
};

export default TasksPage;
