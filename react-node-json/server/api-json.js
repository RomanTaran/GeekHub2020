const express = require("express");
const router = express.Router();
const fs=require("fs");

router.get("/", (req,res)=> {
  fs.readFile('todo.json', (err, data) => {
    if (err) throw err;
    res.send(data);
  })
})


router.post("/", (req,res)=>{
  fs.readFile('todo.json', 'utf-8',(err, data) => {
    if (err) throw err;
    const newItem = [...JSON.parse(data),req.body];
    fs.writeFile('todo.json',JSON.stringify(newItem),(err)=> console.error(Error))
  })
  res.send(req.body)

});

router.post("/todo/:id", (req,res)=> {
  const {id} = req.body;
  fs.readFile('todo.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const newItem = JSON.parse(data).filter(item => item._id !== id);
    console.log(newItem);
    fs.writeFile('todo.json', JSON.stringify(newItem), (err) => console.error(Error))
  })
  res.send(req.body);
})

router.put("/todo/:id", (req,res)=> {
  const {_id} = req.body;
  fs.readFile('todo.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const newItem = JSON.parse(data).map(item => item._id === _id?req.body:item);
    fs.writeFile('todo.json', JSON.stringify(newItem), (err) => console.error(Error))
  })
  res.send(req.body);
})

module.exports = router;