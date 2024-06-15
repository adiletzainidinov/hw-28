import { Box, Typography, Button, TextField, styled } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { Todo as TypeTodo } from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';
import {
  deleteTodo,
  editTodo,
  isCompleted,
} from '../../store/slices/todoSlice/TodoSlice';
import { margin } from '@mui/system';

const Todo: FC<TypeTodo> = ({ title, id, date, whoWillDo }) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const [editValueDate, setEditValueDate] = useState(date);
  const [editValueName, setEditValueName] = useState(whoWillDo.name);
  const [editValueUserId, setEditValueUserId] = useState(whoWillDo.userId);

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
  const handleEditValueDate = (e: ChangeEvent<HTMLInputElement>) =>
    setEditValueDate(e.target.value ? new Date(e.target.value) : null);
  const handleEditValueName = (e: ChangeEvent<HTMLInputElement>) =>
    setEditValueName(e.target.value);
  const handleEditValueUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setEditValueUserId(e.target.value);

  const handleEdit = () => {
    const newTodo: TypeTodo = {
      title: editValue,
      id,
      date: editValueDate,
      whoWillDo: { name: editValueName, userId: editValueUserId },
    };
    dispatch(editTodo(newTodo));
    setOpenEdit(false);
  };

  return (
    <>
      {openEdit ? (
        <BoxMui>
          <TextField value={editValue} onChange={handleEditValue} />
          <TextField
            value={editValueDate}
            onChange={handleEditValueDate}
            type="date"
          />
          <TextField value={editValueName} onChange={handleEditValueName} />
          <TextField value={editValueUserId} onChange={handleEditValueUserId} />

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
            </BoxMui>
      ) : (
        <BoxMui>
          <Typography sx={{ textDecoration: completed ? 'line-through' : '' }}>
            {title}
          </Typography>
          <Typography>{date?.toString()}</Typography>
          <Typography>
            {whoWillDo.name} ({whoWillDo.userId})
          </Typography>
          <BoxMuiButton>
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
          </BoxMuiButton>
        </BoxMui>
      )}
    </>
  );
};

export default Todo;

const BoxMui = styled(Box)(() => {
  return {
    marginTop: 50,
    marginLeft: 20,
    width: '400px',
    padding: 20,
    borderRadius: 10,
    boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.15)',
  };
});
const BoxMuiButton = styled(Box)(() => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  };
});
