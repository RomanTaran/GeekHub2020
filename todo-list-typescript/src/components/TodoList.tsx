import React from "react";
import TodoItem from "./TodoItem";
import {TodoListProps} from "../types";

const TodoList:React.FC<TodoListProps> = ({todos}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
      />
    ))}
  </ul>
);

export default TodoList;
