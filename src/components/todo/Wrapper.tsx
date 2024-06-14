import { FC } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Wrapper: FC = () => {
  return (
    <div>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default Wrapper;
