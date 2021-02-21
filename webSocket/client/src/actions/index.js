import socket from '../socket-api'
import { ADD_TODO, COMPLETE_TODO, DELETE_TODO, EDIT_TODO, GET_TODOS,NEW_TODOS_DATA} from "../constants/ActionTypes";

export const getAllTodos=()=>{
  return dispatch=>{
    socket.on('TodoSend', newTodos=>{
      console.dir(newTodos);
      dispatch({
        type:NEW_TODOS_DATA,
        payload: newTodos
      })
    })
  }
}

export const getTodos = () => {
  socket.emit("getTodos")
  return dispatch => {
    dispatch({
      type:GET_TODOS
    })
  }
}


export const addTodo = text => {
  const id = Math.random();
  socket.emit('addTodo',{id:id, text:text,completed:false})
  return dispatch => {
    dispatch({type:ADD_TODO})
  }
}

export const deleteTodo = todo => {
  socket.emit('deleteTodo',todo)
  return dispatch => {
    dispatch({type: DELETE_TODO, todo})
  }
}

export const editTodo = (id, text) => {
  socket.emit('updateTodo', {id:id,text:text,completed:false})
  return dispatch => {
    dispatch({type: EDIT_TODO, id: id, text: text})
  }
}

export const completeTodo = (todo) => {
  socket.emit('completeTodo', {id:todo._id,text:todo.text,completed:!todo.completed})
  return dispatch => {
    dispatch({type: COMPLETE_TODO, todo})
  }
}

