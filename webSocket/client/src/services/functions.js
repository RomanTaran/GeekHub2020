import socket from "./socket-api";

export const addTodo = text => {
  const id = Math.random();
  socket.emit('addTodo', {id: id, text: text, completed: false})
}

export const deleteTodo = todo => {
  socket.emit('deleteTodo', todo)
}

export const editTodo = (id, text) => {
  socket.emit('updateTodo', {id: id, text: text, completed: false})
}

export const completeTodo = (todo) => {
  socket.emit('completeTodo', {id: todo._id, text: todo.text, completed: !todo.completed})
};