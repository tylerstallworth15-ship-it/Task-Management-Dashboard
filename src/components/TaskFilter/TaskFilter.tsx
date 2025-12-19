import { TaskFilterProps } from "../../types";

const TaskFilter = ({ filters, onChange }: TaskFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };
    return (
        <div className='border p-4 mb-4 rounded'>
          <h2 className='text-xl font-semibold mb-2'>Filters</h2>

          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            name="searchText"
            value={filters.searchText}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
      );
    };

    export default TaskFilter;