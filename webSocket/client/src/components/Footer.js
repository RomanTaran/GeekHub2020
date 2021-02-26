import React from "react";
import classnames from "classnames";
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from "../constants/TodoFilters";
import store from "../index";
import {clearCompleted} from "../actions";

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed"
};

const Footer = ({
  visibilityFilter,
  activeCount,
  completedCount,
  setFilter,
}) => {
  const handleClearCompleted=()=>{
    store.dispatch(clearCompleted());
  }
  const itemWord = activeCount === 1 ? "item" : "items";
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map(filter => (
          <li key={filter}>
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <a
              className={classnames({ selected: filter === visibilityFilter })}
              style={{ cursor: "pointer" }}
              onClick={() => setFilter(filter)}
            >
              {FILTER_TITLES[filter]}
            </a>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={handleClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
