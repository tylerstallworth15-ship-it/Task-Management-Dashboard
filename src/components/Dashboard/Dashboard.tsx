import {useEffect, useState} from 'react';
import type { Task, TaskFormData, FilterOptions } from '../../types'; 
import { filterTasks, sortTasks, saveTasks, loadTasks } from '../../utils/taskUtils';

import TaskForm from "../TaskForm/TaskForm"; 
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
            task.id === id ? { ...task, status: task.status === 'todo' ? 'in-progress' : task.status === 'in-progress' ? 'done' : 'todo' } : task
        )
    );
};

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
    });
};

const handleMoveDown = (id: string) => {
    setTasks((prev) => {
        const index = prev.findIndex((t) => t.id === id);
        if (index === -1 || index === prev.length - 1) return prev;

        const newTasks = [...prev];
        const temp = newTasks[index + 1];
        newTasks[index + 1] = newTasks[index];
        newTasks[index] = temp;

        return newTasks;
    });
};

const visibleTasks = sortTasks(filterTasks(tasks, filters));
return (   
  <div 
    className={
      theme === 'light' 
        ? 'min-h-screen bg-[#f2f2f2] text-black p-6' 
        : 'min-h-screen bg-[#1a0b2e] text-white p-6'
      }
    >
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Task Dashboard</h1>
          <button 
            className={
              "px-4 py-2 rounded font-medium transition shadow " +
              (theme === 'light'  
                ? "bg-[#6d28d9] text-white hover:bg-[#5b21b6]"
                : "bg-[#a78bfa] text-black hover:bg-[#c4b5fd]")
              }
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            Toggle Theme
          </button>
        </div>

        <div className='rounded-lg p-4 shadow-md bg-card'>
            <TaskForm onSubmit={handleAddTask} />
        </div>

        <div className="rounded-lg p-4 shadow-md bg-card">
          <TaskFilter filters={filters} onChange={setFilters} />
        </div>

        <div className="rounded-lg p-4 shadow-md bg-card">
          <TaskList 
            tasks={visibleTasks}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteTask}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;