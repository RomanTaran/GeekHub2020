import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import { completeTodo } from "../actions";

const TodoList = ({ todos, editTodo, deleteTodo, completeTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        editTodo={editTodo}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired
};

export default TodoList;
