import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import { NavLink } from "react-router-dom";

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
  }
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
    const {todo} = this.props;
    const {id} = todo;
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo({text, id})
    }
    this.setState({editing: false})
  }

  complete = ()=>{
    const {todo} = this.props;
    const {id} = todo;
    this.props.completeTodo(id);
  }
  delete = ()=>{
    const {todo} = this.props
    const {id} = todo;
    this.props.deleteTodo(id);
  }


  render() {
    const {todo: {completed, id, text}, editing} = this.props
    let element;
    if (this.state.editing||editing) {
      element = <TodoTextInput text={text}
                               editing={this.state.editing}
                               onSave={this.handleSave}/>
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={completed}
                 onChange={this.complete}/>

          <label onDoubleClick={this.handleDoubleClick}>
            {text}
          </label>
          <NavLink
            to={`/todo/${id}`}

            activeStyle={{
              textDecoration: 'none',
              color: 'red',

            }}
          >
            GoTo{id}
          </NavLink>
          <NavLink
            to={`/todo/${id}/edit`}

            activeStyle={{
              textDecoration: 'none',
              color: 'red',
              marginRight: '5px'

            }}
          >
            Edit
          </NavLink>
          <button className="destroy"
                  onClick={this.delete}/>
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
