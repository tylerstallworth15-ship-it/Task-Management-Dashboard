export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {

  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  dueDate: string;
}

export interface FilterOptions {
  status: string;
  priority: string;
  searchText: string;
}

export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

export interface TaskFormProps {
    onSubmit: (data: TaskFormData) => void;
    initialData?: TaskFormData;
}

export interface TaskFilterProps {
    filters: FilterOptions;
    onChange: (filters: FilterOptions) => void
}

export interface TaskItemProps {
    task: Task;
    onToggleStatus: (Id: string) => void;
    onDelete: (id: string) => void;
    onMoveUp: (id: string) => void;
    onMoveDown: (id: string) => void;
}

export interface TaskListProps {
    tasks: Task[];
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
    onMoveUp: (id: string) => void;
    onMoveDown: (id: string) => void;
}

export interface DashBoardProps {
    initialTheme: 'light' | 'dark';
}
