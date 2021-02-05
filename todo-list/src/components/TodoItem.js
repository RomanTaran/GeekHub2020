import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import Link from "./Link";

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({editing: true})
  }

  handleSave = (text) => {
    const {todo} = this.props
    const {id} = todo;

    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo({text, id})
    }
    this.setState({editing: false})
  }

  render() {
    const {todo: {completed, id, text}, completeTodo, deleteTodo} = this.props
    let element;
    if (this.state.editing) {
      element = <TodoTextInput text={text}
                               editing={this.state.editing}
                               onSave={this.handleSave}/>
    } else {
      element = (
         <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={completed}
                 onChange={() => completeTodo(id)}/>
          <label onDoubleClick={this.handleDoubleClick}>
            {text}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodo(id)}/>
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
