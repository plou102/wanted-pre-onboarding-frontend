import List from "../components/List";
import { getTodo, postAddTodo } from "../api/requests";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const [listTitle, setListTitle] = useState("");
  const [listData, setListData] = useState([]);
  const isToken = window.localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (isToken === null) {
        navigate("/signin");
      } else {
        const list = await getTodo();
        setListData(list);
      }
    })();
  }, [isToken, listData, navigate]);

  function InputHandler(e) {
    setListTitle(e.target.value);
  }

  async function AddTodoHandler(data) {
    const todo = await postAddTodo(data);
    if (todo) {
      setListTitle("");
    }
  }

  return (
    <TodoContent>
      <Title>Todo List</Title>

      <InputContent>
        <TodoInput
          data-testid="new-todo-input"
          type="text"
          value={listTitle}
          placeholder="제목을 입력해 주세요."
          onChange={InputHandler}
        />
        <AddBtn
          data-testid="new-todo-add-button"
          onClick={() => {
            const data = {
              todo: listTitle,
            };

            AddTodoHandler(data);
          }}
        >
          추가
        </AddBtn>
      </InputContent>

      <ListContent>
        {listData.map((list) => {
          return <List list={list} key={list.id} />;
        })}
      </ListContent>
    </TodoContent>
  );
}

export default TodoList;

const TodoContent = styled.div`
  text-align: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #000069;
  margin-top: 15%;
  margin-bottom: 5%;
`;

const InputContent = styled.div`
  width: 60%;
  margin: auto;
  display: flex;
  gap: 20px;
  margin-bottom: 10%;
`;

const TodoInput = styled.input`
  width: 100%;
  height: 30px;
  margin: auto;
  border: 1px solid #000080;
  border-radius: 5px;
  padding-left: 5px;
`;

const AddBtn = styled.button`
  width: 25%;
  height: 34px;
  font-size: 18px;
  margin: auto;
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

const ListContent = styled.div`
  margin: auto;
  width: 80%;
`;
