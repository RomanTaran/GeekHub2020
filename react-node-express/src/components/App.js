import React, { useEffect, useState } from "react";
import Header from "./Header";
import MainSection from "./MainSection";

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(()=>{
    fetchTodos();
  },[]);
  const fetchTodos = ()=>{
    fetch('/api', {
      mode: "no-cors", headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer: token',
      }
    })
      .then(response => response.json())
      .then(data =>setTodos(data))
  }
  const addTodo = text => {
    const data = {
      _id: Math.random(),
      text:text,
      completed:false
    }
    fetch("/api",{
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer: token',
      },
      body:JSON.stringify(data)
    }).then(res=>res.json()).then(data=>{
      console.log(data)
      setTodos([...todos, data]);
    });
  };

  const deleteTodo = id => {
    fetch(`/api/todo/${id}`,{
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer: token',
      },
      body:JSON.stringify({id})
    }).then(res=>res.json()).then(()=>{
      fetchTodos();
      setTodos(todos);
    });
};

  const editTodo = (todo, text) => {
    const data = {
       text:text,
      _id:todo._id,
      completed:todo.completed
    }
    fetch(`/api/todo/${todo._id}`,{
      method:"PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer: token',
      },
      body:JSON.stringify(data)
    }).then(res=>res.json()).then((data)=>{
     setTodos(todos.map(item=>item._id===data._id?data:item));
    });
  };

  const toggleTodo = id => {
    setTodos(
      todos.map(
        todo =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

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
      <Header addTodo={addTodo} />
      <MainSection
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
        toggleAllTodo={toggleAllTodo}
        clearCompleted={clearCompleted}
      />
    </div>
  );
};

export default App;
