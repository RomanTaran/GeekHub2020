const socket = require( 'socket.io' );
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT","DELETE"]
  }
});
const {resolve} = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const express=require('express');
app.use(cors());
app.use(express.static(resolve(__dirname, "build")));
app.use(bodyParser.json());
app.use("/api", require('./api-json'))
app.get('/',(req,res)=>{
  res.sendFile(resolve(__dirname, "index.html"));
})
const port = 8000;

http.listen(port,(res)=>{
  console.log('Server & Socket listening on port : '+port)
})
io.on('connection', (socket)=>{
  console.log("Connection on socket: "+socket.id);
  socket.emit("Data changed");
})
module.exports = io

