import { connect } from 'react-redux'
import { deleteTodo, editTodo, completeTodo, completeAllTodos, clearCompleted } from '../features/todos/todosSlice'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors'
import { bindActionCreators } from "redux";

const mapStateToProps = (state,ownProps) => {
  return ({
  todosCount: state.todos.length,
  filter:ownProps.filter,
  completedCount: getCompletedTodoCount(state)
})}
  const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    deleteTodo,
    editTodo,
    completeTodo,
    completeAllTodos,
    clearCompleted
  }, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection)

