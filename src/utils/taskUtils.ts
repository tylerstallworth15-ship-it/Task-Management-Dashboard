import type { Task, FilterOptions, TaskFormData } from '../types';

export function filterTasks(tasks: Task[], filters: FilterOptions): Task[] {
    return tasks.filter((task) => {
        const matchesStatus = 
        filters.status === 'all' || task.status === filters.status;

        const matchesPriority = 
        filters.priority === 'all' || task.priority === filters.priority;

        const matchesSearch = 
          filters.searchText.trim() === '' ||
            task.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
            task.description.toLowerCase().includes(filters.searchText.toLowerCase());

        return matchesStatus && matchesPriority && matchesSearch;
    });
}   

export function sortTasks(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
export function validateTaskFormData(data: TaskFormData): string[] {
    const errors: string[] = [];

    if (!data.title.trim()) {
        errors.push('Title is required');
    }

    if (!data.description.trim()) {
        errors.push('Description is required');
    }
    
    if (!data.dueDate.trim()) {
        errors.push('Due Date is required');
    }

    return errors;
}

const STORAGE_KEY = 'tasks';

export function saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
}

export function loadTasks(): Task[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
}