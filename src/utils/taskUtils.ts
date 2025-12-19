import { Task, FilterOptions, TaskFormData } from '../types';

export function filterTasks(tasks: Task[], filters: FilterOptions): Task[] {
    return tasks.filter(task) => {
        const matchesStatus = 
        filters.status === 'all' || task.status === filters.status;

        const matchesPriority = 
        filters.priority === 'all' || task.priority === filters.priority;

        const matchesSearch = 
        task.title.toLowerCase().includes(filters.search.toLowerCase()) || 
        task.description.toLowerCase().includes(filters.search.toLowerCase());

        return matchesStatus && matchesPriority && matchesSearch;
    });
}   

export function sortTasks(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
}
export function validateTaskFormData(data: TaskFormData): string[] {
    const errors: string[] = [];

    if (!data.title.trim()) {
        errors.push('Title is required');
    }

    if (data.description.trim()) {
        errors.push('Description is required');
    }
    
    if (!data.dueDate.trim()) {
        errors.push('Due Date is required');
    }

    return errors;
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

export function loadTasks(): Task[] {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];