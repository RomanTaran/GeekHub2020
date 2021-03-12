import { combineReducers } from 'redux'
import todosReducer from './todoSlice'

const rootReducer = combineReducers({
  todos: todosReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer
