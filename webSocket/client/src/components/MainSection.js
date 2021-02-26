import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import TodoList from "./TodoList";
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from "../constants/TodoFilters";
import socket from "../services/socket-api"
import store from "../index";
import { getTodos } from "../actions"
import { connect } from "react-redux";

const MainSection = ({todos}) => {
  const [visibilityFilter, setFilter] = useState(SHOW_ALL);
  useEffect(() => {
    store.dispatch(getTodos());
    socket.on("Data changed", () => {
      store.dispatch(getTodos());
    });
  }, []);
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
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
        />
      )}
    </section>
  );
};
const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(MainSection);
