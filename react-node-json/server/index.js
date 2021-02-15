const express = require("express");
const {resolve} = require("path")
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(resolve(__dirname,'build')));
app.use(bodyParser.json());
app.use("/api",require("./api-json"))

app.get('/',(req,res)=>{
  res.sendFile(resolve(__dirname,"index.html"));
})

app.listen(8000, ()=>{
  console.log("server is listening on port 8000");
})