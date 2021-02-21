const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {resolve} = require("path")
const http = require('http');
const app = express();
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "https://example.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

//import controller file
const todoController = require('./controllers/todo.controller');

io.on('connection', (socket) => {
  console.log("Connected to Socket!!"+ socket.id);
  //send Todos to client
  socket.on('getTodos', () => {
    todoController.getTodos(io);
  });

  // Receiving Todos from client
  socket.on('addTodo', (Todo) => {
    todoController.addTodo(io,Todo);
  });

  // Receiving Updated Todo from client
  socket.on('updateTodo', (Todo) => {
    todoController.updateTodo(io,Todo);
  });

  // Receiving Todo to Delete
  socket.on('deleteTodo', (id) => {
    todoController.deleteTodo(io,id);
  });

  socket.on('completeTodo', (Todo) => {
    todoController.completeTodo(io,Todo);
  });
})

// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.io = skt;
  next();
})

// configure app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(resolve(__dirname,'build')));
app.get('/',(req,res)=>{
  res.sendFile(resolve(__dirname,"index.html"));
})

// set the port
const port = process.env.PORT || 8000;

// connect to database
mongoose.connect('mongodb://localhost/mern-todo-app',{ useNewUrlParser: true,  useUnifiedTopology: true});

// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// start the server
httpServer.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});