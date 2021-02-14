const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static('../build'));
app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/build/index.html");
})
app.use(bodyParser.json());
app.use("/api",require("./api-json"))

app.listen(8000, ()=>{
  console.log("server is listening on port 8000");
})