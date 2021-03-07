import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import TodoList from "./TodoList";
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from "../constants/TodoFilters";
import { getTodos } from "../reducers/todosSlice"
import { connect, useDispatch } from "react-redux";
import socket from "../services/socket-api";
import GlobalError from "./GlobalError";

const MainSection = ({todos}) => {
  const dispatch = useDispatch();
  const [visibilityFilter, setFilter] = useState(SHOW_ALL);
  useEffect(() => {
    socket.on("Change",()=>{
      dispatch(getTodos())});
   }, [dispatch]);
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
      <GlobalError/>
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
};
const mapStateToProps = state =>state.todoReducer;

export default connect(mapStateToProps)(MainSection);
