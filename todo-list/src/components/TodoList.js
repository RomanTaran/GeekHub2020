import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const TodoList = ({ todos, actions,filter}) => {
  return (
  <ul className="todo-list">
    {todos.map(todo =>
      <TodoItem key={todo.id} filter={filter} todo={todo} {...actions}/>
    )}
  </ul>
)}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  actions: PropTypes.object.isRequired
}

export default TodoList
