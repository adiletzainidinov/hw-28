interface WhoWill {
  name: string;
  userId: string;
}

export interface Todo {
  title: string;
  id: number;
  isCompleted?: boolean;
  date: Date | null;
  whoWillDo: WhoWill;
}

export interface TodosState {
  todos: Todo[];
}
