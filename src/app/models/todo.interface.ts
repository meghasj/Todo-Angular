// todo.model.ts
export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;  // Add this line to include userId property
  }
  