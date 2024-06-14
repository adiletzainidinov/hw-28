import { Box, TextField, Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Todo } from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/slices/todoSlice/TodoSlice';

const TodoForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      title,
      id: Math.random(),
    };
   dispatch(addTodo(newTodo))
   setTitle('')
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit}>
      <TextField value={title} onChange={handleTitle} />
      <Button variant="contained" size="large" type="submit">
        Add
      </Button>
    </Box>
  );
};

export default TodoForm;
