import { TaskItemsProps } from '../../types';
import { formDate } from '../../utils/taskUtils';

const TaskItem = ({ task, onToggleStatus, onDelete, onMoveUp, onMoveDown }: TaskItemsProps) => {
    return (
      <div className="border p-3 rounded mb-2 flex justify-between items-center">
        <div>
            <h3 className="font-semibold"></h3>
    