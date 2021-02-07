import React from 'react'
import PropTypes from 'prop-types'
import Footer from './Footer'
import VisibleTodoList from '../containers/VisibleTodoList'
import { useParams } from "react-router";

const MainSection = ({todosCount, completedCount, actions}) => {
  const {filter} = useParams();
  return (
    <section className="main">
      {
        !!todosCount &&
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={actions.completeAllTodos}/>
        </span>
    }
    <VisibleTodoList filter={filter||'all'}/>
    {
      !!todosCount &&
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={actions.clearCompleted}
      />
    }
  </section>
  )
}
MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection;