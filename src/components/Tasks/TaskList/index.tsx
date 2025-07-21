import { useTasks } from "../../../hooks/useTasks";
import TaskItem from "../TaskItem";

const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </>
  );
};

export default TaskList;
