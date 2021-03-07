import React from "react";
import classnames from "classnames";
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from "../constants/TodoFilters";

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed"
};

const Footer = ({
  visibilityFilter,
  activeCount,
  setFilter,
}) => {
  const itemWord = activeCount === 1 ? "item" : "items";
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map(filter => (
          <li key={filter}>
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
    </footer>
  );
};

export default Footer;
