import React, { Component } from "react";
import classnames from "classnames";
import TodoTextInput from "./TodoTextInput";
import { connect } from "react-redux";
import { completeTodo, deleteTodo, editTodo } from "../reducers/todosSlice";

class TodoItem extends Component {

  state = {
    editing: false
  };

  handleDoubleClick = () => {
    this.setState({editing: true});
  };

  handleSave = (text) => {
    const {todo} = this.props
    if (todo.text.length === 0) {
      this.props.deleteTodo(todo);
    } else {
      this.props.editTodo({...todo, text: text});
    }
    this.setState({editing: false});
  };
  handleDelete = () => {
    const {todo} = this.props
    this.props.deleteTodo(todo);
  }
  handleCompleteTodo = () => {
    const {todo} = this.props
    this.props.completeTodo(todo.id)
  }

  render() {
    const {todo} = this.props;
    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={this.handleCompleteTodo}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={this.handleDelete}/>
        </div>
      );
    }

    return (
      <li
        key={classnames({id:todo.id})}
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}

export default connect(null, {editTodo, deleteTodo, completeTodo})(TodoItem);