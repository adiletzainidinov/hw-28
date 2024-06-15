import { Box, TextField, Button, styled } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { Todo } from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';
import { addTodo, deleteAll } from '../../store/slices/todoSlice/TodoSlice';

const TodoForm: FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [name, setName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDate = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value ? new Date(e.target.value) : null);
  const handleName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (title !== '') {
      const newTodo: Todo = {
        title,
        id: Math.random(),
        date,
        whoWillDo: { name, userId },
      };
      dispatch(addTodo(newTodo));
      setTitle('');
      setDate(null);
      setName('');
      setUserId('');
    }
  };

  const handlerDeleteAll = () => {
    dispatch(deleteAll());
  };

  return (
    <BoxMui component={'form'} onSubmit={handleSubmit}>
      <TextField
        label="Title"
        placeholder="Title"
        value={title}
        onChange={handleTitle}
      />
      <TextField
        value={date ? date.toISOString().split('T')[0] : ''}
        onChange={handleDate}
        type="date"
      />
      <TextField
        label="Name"
        placeholder="Name"
        value={name}
        onChange={handleName}
      />
      <TextField
        label="UserId"
        placeholder="UserId"
        value={userId}
        onChange={handleUserId}
      />
      <Button variant="contained" size="large" type="submit">
        Add
      </Button>
      <Button
        onClick={handlerDeleteAll}
        variant="contained"
        size="large"
        type="button"
      >
        Delete All
      </Button>
    </BoxMui>
  );
};

export default TodoForm;

const BoxMui = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: 500,
    padding: '60px 20px 40px 20px',
    borderRadius: 10,
    boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.15)',
    margin: '100px auto 0 auto'
  };
});
