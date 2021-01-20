import { combineReducers } from 'redux'
import todosReducer from '../features/todos/todosSlice'
import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  todos:todosReducer,
  visibilityFilter
})

export default rootReducer
