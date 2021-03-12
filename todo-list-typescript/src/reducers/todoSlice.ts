import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo, Todos} from "../types";

const initialState: Todos = [
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
      reducer(state, action: PayloadAction<Todo>) {
        state.push({...action.payload})
      },
      prepare(text: string) {
        return {payload: {text, id: newId++, completed: false}}
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter(elem => elem.id !== action.payload)
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      return state.map((item, index) => {
        if (index === action.payload.id) {
          return {...item, text: action.payload.text}
        } else {
          return item
        }
      })
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      return state.map(todo => {
          if (todo.id === action.payload) {
            const completed = todo.completed !== true;
            return {...todo, completed: completed}
          } else {
            return {...todo}
          }
        }
      )
    }
  }
})
export const {addTodo, deleteTodo, editTodo, completeTodo} = todosSlice.actions
export default todosSlice.reducer