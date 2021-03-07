import React from 'react'
import TodoTextInput from './TodoTextInput'
import { addTodo } from '../reducers/todosSlice'
import store from "../index";

class Header extends React.Component {
  handleSave = text => {
    if (text.length !== 0) store.dispatch(addTodo(text));
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    )
  }
}

export default Header