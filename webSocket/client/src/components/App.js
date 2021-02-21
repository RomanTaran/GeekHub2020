import React, { useEffect, useState } from "react";
import Header from "./Header";
import MainSection from "./MainSection";
import socket from "../socket-api";

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    socket.emit('getTodos');
    socket.on('TodoSend', msg => {
      setTodos(msg);
    });
  }, []);
  const addTodo = text => {
    const id = Math.random();
    socket.emit('addTodo', {id: id, text: text, completed: false})
    /*    return dispatch => {
          dispatch({type:ADD_TODO})
        }*/
  }

  const deleteTodo = todo => {
    socket.emit('deleteTodo', todo)
    /*    return dispatch => {
          dispatch({type: DELETE_TODO, todo})
        }*/
  }

  const editTodo = (id, text) => {
    socket.emit('updateTodo', {id: id, text: text, completed: false})
    /*    return dispatch => {
          dispatch({type: EDIT_TODO, id: id, text: text})
        }*/
  }

  const completeTodo = (todo) => {
    socket.emit('completeTodo', {id: todo._id, text: todo.text, completed: !todo.completed})
    /*    return dispatch => {
          dispatch({type: COMPLETE_TODO, todo})
        }*/
  }
  const toggleAllTodo = () => {
    const areAllMarked = todos.every(todo => todo.completed);
    /* setTodos(
       todos.map(todo => ({
         ...todo,
         completed: !areAllMarked
       }))
     );*/
  };

  const clearCompleted = () => {
//    setTodos(todos.filter(todo => todo.completed === false));
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
