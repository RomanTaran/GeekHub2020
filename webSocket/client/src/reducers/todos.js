import { ADD_TODO, CLEAR_COMPLETED, COMPLETE_TODO, DELETE_TODO, EDIT_TODO, GET_TODOS } from '../constants/ActionTypes'

export default function todos(state = [], action) {
  switch (action.type) {

    case GET_TODOS:
      return [...action.data]

    case ADD_TODO:
      return [
        {
          _id: action._id,
          completed: action.completed,
          text: action.text
        },
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo._id !== action._id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo._id === action._id ?
          {...todo, text: action.text} :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo._id === action._id ?
          {...todo, completed: action.completed} :
          todo
      )

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
