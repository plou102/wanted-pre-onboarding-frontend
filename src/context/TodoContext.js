import { deleteTodo, getTodo, postAddTodo, updateTodo } from 'api/requests';
import React, { createContext, useEffect, useState } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await getTodo();
      setListData(list);
    })();
  }, [listData]);

  async function AddTodo(data) {
    const todo = await postAddTodo(data);
    setListData(prev => [...prev, todo]);
  }

  async function UpdateTodo(id, data) {
    await updateTodo(id, data);
  }

  async function DeleteTodo(id) {
    await deleteTodo(id);
  }

  return (
    <TodoContext.Provider value={{ listData, AddTodo, UpdateTodo, DeleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContext;
