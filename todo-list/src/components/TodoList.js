import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import { useParams } from "react-router";

const TodoList = ({ todos, actions}) => {
  const {id, action} = useParams();
  const fullTodolist = todos.map(todo =>
    <TodoItem key={todo.id} todo={todo} {...actions}/>
  )
  const oneTodo = todos.filter(todo => todo.id === Number(id)).map(todo =>
    <TodoItem key={todo.id} todo={todo} editing={action === 'edit' ? 'edit' : 'false'} {...actions}/>)
  return (
    <ul className="todo-list">
      {id ? oneTodo : fullTodolist}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  actions: PropTypes.object.isRequired
}

export default TodoList
