type TaskItemType = {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
};

const TaskItem = ({ title, onEdit, onDelete }: TaskItemType) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow p-4 mb-2">
      <span className="font-medium text-gray-800">{title}</span>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
