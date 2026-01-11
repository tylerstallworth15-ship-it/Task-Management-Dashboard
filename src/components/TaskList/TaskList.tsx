import type { TaskListProps } from '../../types';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  onToggleStatus,
  onDelete,
  onMoveUp,
  onMoveDown,
}: TaskListProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Tasks</h2>

      {tasks.length === 0 && (
        <p className="text-gray-400 italic">No tasks found.</p>
      )}

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;