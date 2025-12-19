import {useEffect, useState} from 'react';
import { Task, TaskFormData, FilterOptions } from './types'; 
import { filterTasks, sortTasks, saveTasks, loadTasks } from '../../utils/taskUtils';

import TasksForm from "../TasksForm/TasksForm"; 
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskList from "../TaskList/TaskList";

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>(loadTasks());
    const [filters, setFilters] = useState<FilterOptions>({ 
        status: 'all', 
        priority: 'all',
        searchText: '',
    });

    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
      const stored = loadTasks();
      setTasks(stored);
    }, []);

useEffect(() => {
    saveTasks(tasks);
}, [tasks]);

const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        createdAt: new Date().toISOString(),
        dueDate: data.dueDate,
    };

    setTasks((prev) => [...prev, newTask]);
};

const handleToggleStatus = (id: string) => {
    setTasks((prev) => 
        prev.map((task) => 
            task.id === id ? { ...task, status: task.status === 'todo' ? 'pending' : task.status === 'pending' ? 'completed' : 'todo' } : task
        )
    );
}

const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
};
  
const handleMoveUp = (id: string) => {
    setTasks((prev) => {
        const index = prev.findIndex((t) => t.id === id);
        if (index < 0) return prev;

        const newTasks = [...prev];
        const temp = newTasks[index -1];
        newTasks[index - 1] = newTasks[index];
        newTasks[index] = temp;

        return newTasks;
    }
};

const visibleTasks = sortTasks(filterTasks(tasks, filters));
return (   
  <div className={`theme === 'light' ? 'bg-white text-black p-4' : 'bg-gray-900 text-white p-4'`}>
    <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
    <button 
      className="mb-4 px-3 py-1 border rounded"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
        Toggle Theme
    </button>
    <TasksForm onSubmit={handleAddTask} />
    <TaskFilter filters={filters} onChange={setFilters} />
    <TaskList 
      tasks={visibleTasks}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />
    </div>
  );
};

export default Dashboard;