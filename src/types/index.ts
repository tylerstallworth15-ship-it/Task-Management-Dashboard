export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {

  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  CreatedAt: string;
  dueDate: string;
}

export interface FilterOptions {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
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
    initalData?: TaskFormData;
    onSubmit: (data: TaskFormData) => void;
}

export interface TaskFilterProps {
    filters: FilterOptions;
    onChange: (filters: FilterOptions) => void
}

export interface TaskItemProps {
    task: Task;
    onToggleStatus: (Id: string) => void;
    onDelete: (id: string) => void;
    onMoveup: (id: string) => void;
    onMoveDown: (id: string) => void;
}

export interface TaskListProps {
    tasks: Task[];
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
    onMoveup: (id: string) => void;
    onMoveDown: (id: string) => void;
}

export interface DashBoardProps {
    initialTheme: 'light' | 'dark';
}
