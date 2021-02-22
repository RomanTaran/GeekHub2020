import React, { useEffect, useState } from "react";
import Header from "./Header";
import MainSection from "./MainSection";
import socket from "../services/socket-api";
import { addTodo, completeTodo, deleteTodo, editTodo } from "../services/functions";

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    socket.emit('getTodos');
    socket.on('TodoSend', msg => {
      setTodos(msg);
    });
  }, []);

  const toggleAllTodo = () => {
    const areAllMarked = todos.every(todo => todo.completed);
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  }
  return (
    <div>
      <Header addTodo={addTodo}/>
      <MainSection
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        completeTodo={completeTodo}
        toggleAllTodo={toggleAllTodo}
        clearCompleted={clearCompleted}
      />
    </div>
  );
};

export default App;
