import React from 'react'
import PropTypes from 'prop-types'
import FilterLink from '../containers/FilterLink'
const VisibilityFilters={
  SHOW_ALL:'all',
  SHOW_COMPLETED:'completed',
  SHOW_ACTIVE:'active'
}
const Footer = (props) => {
  const { activeCount, completedCount, onClearCompleted } = props
  const itemWord = activeCount === 1 ? 'item' : 'items'
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
      <ul className="filters">
        <li>
          <FilterLink filter={VisibilityFilters.SHOW_ALL}>
            All
          </FilterLink>
        </li>
        <li>
          <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
            Active
          </FilterLink>
        </li>
        <li>
          <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
            Completed
          </FilterLink>
        </li>
      </ul>
      {
        !!completedCount &&
        <button
          className="clear-completed"
          onClick={onClearCompleted}
        >Clear completed</button>
        
      }
    </footer>
  )
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

export default Footer
