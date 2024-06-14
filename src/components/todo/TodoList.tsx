import { RootState } from './../../store/store'
import Todo from './Todo';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { Todo as TypeTodo } from '../../store/slices/todoSlice';

const TodoList: FC = () => {
  const { todos } = useSelector((state: RootState) => state.todo);
  return (
    <div>
      {todos.map((item: TypeTodo) => (
        <Todo key={item.id} {...item} />
      ))}
    </div>
  );
};

export default TodoList;
