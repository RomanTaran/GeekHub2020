import { connect } from 'react-redux'
import { clearCompleted, completeAllTodos, completeTodo, deleteTodo, editTodo } from '../features/todos/todosSlice'
import TodoList from '../components/TodoList'
import { bindActionCreators } from "redux";

const VisibilityFilters={
  SHOW_ALL:'all',
  SHOW_COMPLETED:'completed',
  SHOW_ACTIVE:'active'
}

const getVisibleTodos = (state, props) => {
  const {filter} = props;
  const {todos} = state;
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    default:
      return todos.filter((t, index) => {
        return index === Number(filter)
      })
  }
}

const mapStateToProps = (state,ownProps) =>{
  return {
    todos: getVisibleTodos(state, ownProps)
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    deleteTodo,
    editTodo,
    completeTodo,
    completeAllTodos,
    clearCompleted
  }, dispatch)
})


const VisibleTodoList = connect(
  mapStateToProps, mapDispatchToProps
)(TodoList)

export default VisibleTodoList
