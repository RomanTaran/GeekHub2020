const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const {resolve} = require("path")

mongoose.connect("mongodb://localhost/todos-db",{useUnifiedTopology:true, useNewUrlParser:true});

app.use(express.static(resolve(__dirname,'build')));
app.get('/',(req,res)=>{
  res.sendFile(resolve(__dirname,"index.html"));
})
app.use(bodyParser.json());
app.use("/api",require("./api"))

app.listen(8000, ()=>{
  console.log("server is listening on port 8000");
})