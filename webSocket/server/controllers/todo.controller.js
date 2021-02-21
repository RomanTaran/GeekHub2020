const Todo = require('../models/todo.model')
const mongoose = require('mongoose')

const getTodos = (io) => {
  Todo.find().exec((err,todos) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    io.emit('TodoSend', todos);
  });
}

const addTodo = (io,T) => {
  let result;
  const newTodo = new Todo(T);
  newTodo.save((err,todo) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
    }
    else{
      getTodos(io);
    }
  })
}

const updateTodo = (io,T) => {
  let result;
  Todo.findOneAndUpdate({ _id:T.id }, T, { new:true }, (err,todo) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
    }
    else{
      result = {'success':true,'message':'Todo Updated Successfully',todo};
      getTodos(io);
    }
  })
}

const completeTodo = (io,T) => {
  let result;
  Todo.findOneAndUpdate({ _id:T.id }, T, { new:true }, (err,todo) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
    }
    else{
      result = {'success':true,'message':'Todo Complete Successfully',todo};
      getTodos(io);
    }
  })
}

const deleteTodo = (io,T) => {
  let result;
  Todo.findByIdAndRemove(T._id, (err,todo) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
    }
    else {
      result = {'success':true,'message':'Todo deleted successfully', todo};
      getTodos(io);
    }
  })
}

module.exports={getTodos,addTodo,updateTodo,deleteTodo,completeTodo}