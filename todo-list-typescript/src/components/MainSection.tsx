import React, { useState } from "react";
import Footer from "./Footer";
import TodoList from "./TodoList";
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from "../constants/TodoFilters";
import {MainSectionProps, Todos} from "../types";
import {connect} from "react-redux";

const MainSection:React.FC<MainSectionProps> = ({todos}) => {
  const [visibilityFilter, setFilter] = useState(SHOW_ALL);
  const todosCount:number = todos.length;
  const completedCount:number = todos.filter(({completed}) => completed).length;
  let visibleTodos:Todos;
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
const mapStateToProps = (state: Todos) => state;
export default connect(mapStateToProps)(MainSection);