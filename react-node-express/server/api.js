const express = require("express");
const router = express.Router();
const Todo = require("./todo")

router.get("/", (req,res)=>{
  Todo.find({})
    .then(todo=>{
      res.send(todo);
    })
});

router.post("/", (req,res)=>{
  Todo.create(req.body)
    .then(todo=>{
      res.send(todo);
    })
});

router.put("/todo/:id", (req,res)=>{
  Todo.findByIdAndUpdate({_id:req.params.id},req.body)
    .then(()=>{
      console.log(req.params.id);
      Todo.findOne({_id:req.params.id})
        .then(todo=>{
          res.send(todo);
        })
    })

});

router.delete("/todo/:id", (req,res)=>{
  Todo.deleteOne({_id:req.params.id})
    .then(todo=>{
      res.send(todo);
    })
});

module.exports = router;