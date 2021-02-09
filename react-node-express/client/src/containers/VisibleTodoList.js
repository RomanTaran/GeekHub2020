import { connect } from 'react-redux'
import { clearCompleted, completeAllTodos, completeTodo, deleteTodo, editTodo } from '../features/todos/todosSlice'
import TodoList from '../components/TodoList'
import { bindActionCreators } from "redux";

const getVisibleTodos = (state, props) => {
  const {filter} = props;
  const {todos} = state;
  switch (filter) {
    case 'all':
      return todos
    case 'active':
      return todos.filter(t => !t.completed)
    case 'completed':
      return todos.filter(t => t.completed)
    default:
      return todos
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
