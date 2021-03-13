import React, { useState } from "react";
import Footer from "./Footer";
import TodoList from "./TodoList";
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from "../constants/TodoFilters";
import {useSelector } from "react-redux";
import {RootState} from "../reducers";

const MainSection:React.FC = () => {
  const {todos} = useSelector((state:RootState) => state);
  const [visibilityFilter, setFilter] = useState(SHOW_ALL);
  const todosCount = todos.length;
  const completedCount = todos.filter(({completed}) => completed).length;
  let visibleTodos;
  switch (visibilityFilter) {
    case SHOW_ALL:
      visibleTodos = todos;
      break;
    case SHOW_COMPLETED:
      visibleTodos = todos.filter(t => t.completed);
      break;
    case SHOW_ACTIVE:
      visibleTodos = todos.filter(t => !t.completed);
      break;
    default:
      throw new Error("Unknown filter: " + visibilityFilter);
  }
  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
        </span>
      )}
      <TodoList
        todos={visibleTodos}
      />
      {!!todosCount && (
        <Footer
          visibilityFilter={visibilityFilter}
          setFilter={setFilter}
          activeCount={todosCount - completedCount}
        />
      )}
    </section>
  );
}

export default MainSection;