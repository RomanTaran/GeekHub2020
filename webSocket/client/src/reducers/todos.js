// Add new GET_TODOS constant
import {
  ADD_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL,
  COMPLETE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  GET_TODOS,
  NEW_TODOS_DATA
} from '../constants/ActionTypes'

// Initial state is not needed anymore
const initialState = [
  // {
  //   text: 'Use Redux',
  //   completed: false,
  //   id: 0
  // }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    // Now as todo data is stored to server, we need to update whole state
    case NEW_TODOS_DATA:
      return [action.payload]
    case GET_TODOS:
      return [...state]
    case ADD_TODO:
      return [...state]
    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.todo.id
      )
    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          {...todo, text: action.text} :
          todo
      )
    case COMPLETE_TODO:
      return state.map(todo => {
        console.log(action)
        return todo.id === action.todo.id ?
          // No more toggling, completed state comes with action payload
          // { ...todo, completed: !todo.completed } :
          {...todo, completed: !action.todo.completed} :
          todo
      })
    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)
    default:
      return state
  }
}
export const selectTodos = state =>{
  return state.todos;
}
