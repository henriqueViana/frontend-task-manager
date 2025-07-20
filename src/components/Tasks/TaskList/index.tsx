import TaskItem from "../TaskItem";

type TaskListType = {
  tasks: { id: string; title: string }[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const TaskList = ({ tasks, onEdit, onDelete }: TaskListType) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          onEdit={() => onEdit(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
