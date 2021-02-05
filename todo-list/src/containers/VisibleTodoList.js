import { connect } from 'react-redux'
import { clearCompleted, completeAllTodos, completeTodo, deleteTodo, editTodo } from '../features/todos/todosSlice'
import TodoList from '../components/TodoList'
import { bindActionCreators } from "redux";
const VisibilityFilters={
  SHOW_ALL:'all',
  SHOW_COMPLETED:'completed',
  SHOW_ACTIVE:'active'
}

const getVisibleTodos = (todos,filter)=>{
  switch (filter){
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t=>!t.completed)
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t=>t.completed)
    default:
      throw new Error('Unknown filter: '+filter)
  }
}

const mapStateToProps = (state,ownProps) =>{
  return {
    todos: getVisibleTodos(state.todos,ownProps.filter)
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
