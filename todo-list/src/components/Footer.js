import React from 'react'
import PropTypes from 'prop-types'
import FilterLink from '../containers/FilterLink'

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
          <FilterLink filter="all">
            All
          </FilterLink>
        </li>
        <li>
          <FilterLink filter="active">
            Active
          </FilterLink>
        </li>
        <li>
          <FilterLink filter="completed">
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
