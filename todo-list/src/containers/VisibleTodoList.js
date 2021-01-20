import { connect } from 'react-redux'
import { deleteTodo, editTodo, completeTodo, completeAllTodos, clearCompleted } from '../features/todos/todosSlice'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from "../selectors"
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
  filteredTodos: getVisibleTodos(state)
})

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
