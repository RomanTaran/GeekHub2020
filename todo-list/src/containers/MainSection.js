import { connect } from 'react-redux'
import { deleteTodo, editTodo, completeTodo, completeAllTodos, clearCompleted } from '../features/todos/todosSlice'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors'
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state)
}), mapDispatchToProps = dispatch => ({
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

