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
    savageTasks(tasks);
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
    }
        
}