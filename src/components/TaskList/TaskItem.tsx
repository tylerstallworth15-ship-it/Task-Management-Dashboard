import { TaskItemProps } from "../../types";
import { formatDate } from "../../taskUtils";

const TaskItem = ({ 
    task,
    onToggleStatus, 
    onDelete,
    onMoveUp,
    onMoveDown
}: TaskItemProps) => {
    return (
        <div className="border p-3 rounded mb-2 flex justify-between imtems-center">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm">{task.description}</p>
            <p className="text-xs text-gray-500">
              Due: {formatDate(task.dueDate || "")}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="px-2 py-1 border rounded"
              onClick={() => onToggleStatus(task.id)}
            >
             Toggle
            </button>

            <button
              className="px-2 py-1 border rounded"
              onClick={() => onMoveUp(task.id)}
            >
              Up
            </button>

            <button
              className="px-2 py-1 border rounded"
              onClick={() => onMoveDown(task.id)}
            >
              Down
            </button>

            <button
              className="px-2 py-1 border rounded text-red-500"
              onClick={() => onDelete(task.id)}
              >
              Delete
            </button>
          </div>
      </div>
     );
    };

export default TaskItem;