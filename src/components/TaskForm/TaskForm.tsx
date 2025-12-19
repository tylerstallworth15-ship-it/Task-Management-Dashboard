import { useState } from 'react';
import { TaskFormData, TaskFormProps } from '../../types';
import { validateTaskFormData } from '../../utils/taskUtils';

const TaskForm = ({ onSubmit, initialData }: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>(
    initialData || {
        title: '',
        description: '',
        status: ' todo ',
        priority: 'medium',
        dueDate: '', 
    }
  );

  const [errors, setErrors] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

    const validationErrors = validateTaskFormData(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
    });

    setErrors([]);
  };
  return (
    <form onSubmit={handleSubmit} className="border p-4 mb-4 rounded">
      <h2 className="text-xl font-bold mb-2">Add Task</h2>

      {errors.length > 0 && (
        <div className="mb-2 text-red-500">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task title"
        className="border p-2 w-full mb-2"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Task description"
        className="border p-2 w-full mb-2"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

        <button className='bg-blue-500 text-white p-2 rounded'>Add Task</button>
      </form>
   );
};

export default TaskForm;