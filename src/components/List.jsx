import { deleteTodo, updateTodo } from '../api/requests';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

function List({ list }) {
  const [checkbox, setCheckbox] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');

  useEffect(() => {
    setCheckbox(list.isCompleted);
    setTodoTitle(list.todo);
  }, [list.isCompleted, list.todo]);

  async function CheckboxHandler(e) {
    setCheckbox(e.target.checked);

    const data = {
      todo: list.todo,
      isCompleted: e.target.checked,
    };
    await updateTodo(list.id, data);
  }

  async function DeleteHandler() {
    await deleteTodo(list.id);
  }

  function ModifyInputHandler(e) {
    setTodoTitle(e.target.value);
  }

  async function SubmitHandler() {
    const data = {
      todo: todoTitle,
      isCompleted: checkbox,
    };

    await updateTodo(list.id, data);
    setUpdateMode(false);
  }

  if (updateMode) {
    return (
      <ListContent>
        <ListCheck type="checkbox" checked={checkbox} onChange={e => CheckboxHandler(e)} />
        <UpdateInput
          data-testid="modify-input"
          type="text"
          value={todoTitle}
          onChange={e => ModifyInputHandler(e)}
        />

        <UpdateBtn data-testid="submit-button" onClick={() => SubmitHandler()}>
          제출
        </UpdateBtn>
        <DeleteBtn
          data-testid="cancel-buttont"
          onClick={() => {
            setUpdateMode(false);
            setTodoTitle(list.todo);
          }}
        >
          취소
        </DeleteBtn>
      </ListContent>
    );
  }

  return (
    <ListContent>
      <ListCheck type="checkbox" checked={checkbox} onChange={e => CheckboxHandler(e)} />
      <ListTitle>{list.todo}</ListTitle>

      <UpdateBtn data-testid="modify-button" onClick={() => setUpdateMode(true)}>
        수정
      </UpdateBtn>
      <DeleteBtn data-testid="delete-buttont" onClick={() => DeleteHandler()}>
        삭제
      </DeleteBtn>
    </ListContent>
  );
}

export default List;

const ListContent = styled.li`
  list-style: square;
  height: 40px;
  &::marker {
    color: #000080;
    font-size: 20px;
  }
`;

const ListCheck = styled.input`
  margin: 0 15px 0 -8px;
  zoom: 1.2;
`;

const ListTitle = styled.p`
  display: inline-block;
  width: 40%;
  text-align: start;
  color: #000069;
  font-size: 19px;
  margin-right: 10%;
  margin-top: 4px;
`;

const UpdateBtn = styled.button`
  width: 15%;
  height: 25px;
  font-size: 15px;
  border-radius: 5px;
  background-color: transparent;
  color: #000069;
  border: 1px solid #000080;
  box-shadow: 3px 3px 3px #646496;
  transition-duration: 0.3s;
  margin-right: 8px;
  &:active {
    box-shadow: none;
  }
`;

const DeleteBtn = styled.button`
  width: 15%;
  height: 25px;
  font-size: 15px;
  border-radius: 5px;
  background-color: transparent;
  color: #000069;
  border: 1px solid #000080;
  box-shadow: 3px 3px 3px #646496;
  transition-duration: 0.3s;
  &:active {
    box-shadow: none;
  }
`;

const UpdateInput = styled.input`
  width: 40%;
  height: 25px;
  margin: auto;
  font-size: 18px;
  border: 1px solid #000080;
  border-radius: 5px;
  padding-left: 5px;
  margin-right: 7%;
`;
