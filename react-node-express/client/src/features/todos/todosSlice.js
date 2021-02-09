import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    text: 'Use Redux',
    completed: false,
  }
]

let newId = 1;
const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        const {id, text} = action.payload
        state.push({id, text, completed: false})
      },
      prepare(text) {
        return {payload: {text, id: newId++}}
      }
    },
    deleteTodo: (state, action) => {
      return state.filter(elem => elem.id !== action.payload)
    },
    editTodo: (state, action) => {
      return state.map((item, index) => {
        if (index === action.payload.id) {
          return {...item, text: action.payload.text}
        } else {
          return item
        }
      })
    },
    completeTodo: (state, action) => {
      return state.map(todo => {
          if (todo.id === action.payload) {
            const completed = todo.completed !== true;
            return {...todo, completed: completed}
          } else {
            return {...todo}
          }
        }
      )
    },
    completeAllTodos: state => {
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
    },
    clearCompleted: state => state.filter(todo => todo.completed === false)
  }
})
export const {addTodo, deleteTodo, editTodo, completeTodo, completeAllTodos, clearCompleted} = todosSlice.actions
export default todosSlice.reducer