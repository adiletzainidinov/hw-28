export interface Todo {
  title: string;
  id: number;
  isCompleted?: boolean;
}

export interface TodosState {
  todos:Todo[];
}
