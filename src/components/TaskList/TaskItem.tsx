import type { TaskItemProps } from "../../types";
import { formatDate } from "../../utils/taskUtils";

const TaskItem = ({ 
    task,
    onToggleStatus, 
    onDelete,
    onMoveUp,
    onMoveDown
}: TaskItemProps) => {
    return (
        <div className="border border-gray-600 bg-black/10 p-3 rounded-lg mb-2 flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm">{task.description}</p>
            <p className="text-xs text-gray-500">
              Due: {formatDate(task.dueDate || "")}
            </p>
          </div>

          <div className="flex gap-2 text-sm">
            <button
              className="px-2 py-1 border rounded hover:bg-white/10 transition"
              onClick={() => onToggleStatus(task.id)}
            >
             Toggle
            </button>

            <button
              className="px-2 py-1 border rounded hover:bg-white/10 transition"
              onClick={() => onMoveUp(task.id)}
            >
              Up
            </button>

            <button
              className="px-2 py-1 border rounded hover:bg-white/10 transition"
              onClick={() => onMoveDown(task.id)}
            >
              Down
            </button>

            <button
              className="px-2 py-1 border rounded text-red-400 hover:bg-red-400/20 transition"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    };

export default TaskItem;