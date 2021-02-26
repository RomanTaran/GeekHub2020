import React from 'react'
import TodoTextInput from './TodoTextInput'
import { addTodo } from '../actions'
import store from "../index";

const Header = () => {
  const handleSave = text => {
    if(text.length!==0) store.dispatch(addTodo(text));
  }
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={handleSave}
        placeholder="What needs to be done?"
      />
    </header>
  )
}
export default Header