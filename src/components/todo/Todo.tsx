import { Box, Typography, Button, TextField } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { Todo as TypeTodo } from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';
import {
  deleteTodo,
  editTodo,
  isCompleted,
} from '../../store/slices/todoSlice/TodoSlice';

const Todo: FC<TypeTodo> = ({ title, id }) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const deleteHandler = () => {
    dispatch(deleteTodo(id));
  };

  const handlerIsCompleted = () => {
    setCompleted((prev) => !prev);
    dispatch(isCompleted(id));
  };

  const handleOpenEdit = () => {
    setOpenEdit((prev) => !prev);
  };
  const handleEditValue = (e: ChangeEvent<HTMLInputElement>) =>
    setEditValue(e.target.value);

  const handleEdit = () => {
    const newTodo: TypeTodo = {
      title: editValue,
      id,
    };
    dispatch(editTodo(newTodo));
    setOpenEdit(false);
  };

  return (
    <>
      {openEdit ? (
        <Box>
          <TextField value={editValue} onChange={handleEditValue} />
          <Button
            variant="outlined"
            size="small"
            type="button"
            onClick={handleEdit}
          >
            Save
          </Button>
          <Button
            onClick={handleOpenEdit}
            variant="outlined"
            size="small"
            type="button"
          >
            Close
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography sx={{ textDecoration: completed ? 'line-through' : '' }}>
            {title}
          </Typography>
          <Button
            onClick={deleteHandler}
            variant="outlined"
            size="small"
            type="button"
          >
            Delete
          </Button>
          <Button
            onClick={handlerIsCompleted}
            variant="outlined"
            size="small"
            type="button"
          >
            {completed ? 'Completed' : 'InCompleted'}
          </Button>
          <Button
            onClick={handleOpenEdit}
            variant="outlined"
            size="small"
            type="button"
          >
            Edit
          </Button>
        </Box>
      )}
    </>
  );
};

export default Todo;
