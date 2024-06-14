import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodosState } from '.';

const initialState: TodosState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<Todo>) => {
      state.todos.push(payload);
    },
    deleteTodo: (state, { payload }: PayloadAction<number>) => {
      state.todos = state.todos.filter((item) => item.id !== payload);
    },
    deleteAll: (state) => {
      state.todos = [];
    },
    isCompleted: (state, { payload }: PayloadAction<number>) => {
      state.todos.map((item) =>
        item.id === payload ? { ...item, isCompleted: !item.isCompleted } : item
      );
    },
    editTodo: (state, { payload }: PayloadAction<Todo>) => {
      state.todos = state.todos.map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item
      );
    },
  },
});

export const { addTodo, deleteTodo, deleteAll, isCompleted,editTodo } =
  todoSlice.actions;
