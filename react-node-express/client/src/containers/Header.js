import { connect } from 'react-redux'
import Header from '../components/Header'
import { addTodo } from '../features/todos/todosSlice'

export default connect(null, { addTodo })(Header)
