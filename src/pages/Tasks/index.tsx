import { useStore } from "../../hooks/useStore";
import { useDispatch } from "react-redux";
// import { deleteTask } from "../../store/tasksSlice"; // supondo que você tenha essa action
import TaskList from "../../components/Tasks/TaskList";
import Sidebar from "../../components/Sidebar";

const TasksPage = () => {
  const { tasks } = useStore();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    //dispatch(deleteTask(id)); // sua action personalizada
  };

  const handleEdit = (id: string) => {
    console.log("Editar tarefa", id);
    // redirecionar ou abrir modal
  };

  const handleNewTask = () => {
    console.log("Criar nova tarefa");
    // redirecionar ou abrir modal
  };

  return (
    <div className="flex min-h-screen h-screen bg-gray-50">
      <Sidebar />
      <div className="p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-default-black">
            Minhas Tarefas
          </h1>
          <button
            onClick={handleNewTask}
            className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
          >
            Nova Tarefa
          </button>
        </div>

        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default TasksPage;
