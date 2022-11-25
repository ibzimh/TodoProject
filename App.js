import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";

const localStorageKey = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedTodos) setTodos(storedTodos);
  }, []);
  // gets the data from the local storage

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }, [todos]);
  // stores data to local storage every time a change is made to todos

  function addTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    let i = -1;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: ++i, name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function clearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={clearTodos}>Clear Complete</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
