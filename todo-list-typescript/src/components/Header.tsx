import React from 'react'
import TodoTextInput from './TodoTextInput'
import { addTodo } from '../reducers/todoSlice'
import { connect } from "react-redux";
import {HeaderProps} from "../types";

class Header extends React.Component <HeaderProps>{
  handleSave = (text:string) => {
    if (text.length !== 0) this.props.addTodo(text);
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

export default connect(null, {addTodo})(Header);
