import { combineReducers } from 'redux'
import { todoReducer } from "./todosSlice";

const rootReducer = combineReducers({
  todoReducer: todoReducer.reducer
})

export default rootReducer
