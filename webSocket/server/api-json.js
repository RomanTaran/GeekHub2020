const socket = require('socket.io')();
const express = require("express");
const router = express.Router();
const {resolve} = require("path")
const fs = require("fs");
const {promisify} = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const handleReadFile = readFile(resolve(__dirname, "todo.json"));
const handleWriteFile = item => writeFile(resolve(__dirname, "todo.json"), JSON.stringify(item));

//get todo
router.get("/", (req, res) => {
  handleReadFile
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

//add todo
router.post("/todo", (req, res) => {
  handleReadFile
    .then(data => {
      const newItem = [...JSON.parse(data), req.body];
      return handleWriteFile(newItem);
    })
    .then(() => res.send(req.body))
    .catch(err => res.status(500).send(err));
});

//delete todo
router.delete("/todo/:id", (req, res) => {
  handleReadFile
    .then(data => {
      const {_id} = req.body;
      const newItem = JSON.parse(data).filter(item => item._id !== _id)
      return handleWriteFile(newItem);
    })
    .then(() => res.send(req.body))
    .catch(err => res.status(500).send(err))
})

//edit todo
router.put("/todo/:id", (req, res) => {
  handleReadFile
    .then(data => {
      const {_id} = req.body;
      const newItem = JSON.parse(data).map((item) => {
        if (item._id === _id) {
          return req.body;
        } else {
          return item;
        }
      });
      return handleWriteFile(newItem);
    })
    .then(() => res.send(req.body))
    .catch(err => res.status(500).send(err))
})

//complete todo
router.put("/todo/complete/:id", (req, res) => {
  handleReadFile
    .then(data => {
      const {_id, completed} = req.body;
      const newItem = JSON.parse(data).map(item => item._id === _id ?
        {...item, completed: completed} :
        item)
      return handleWriteFile(newItem);
    })
    .then(() => res.send(req.body))
    .catch(err => res.status(500).send(err))
})

//clear completed
router.delete("/todo/complete/all", (req, res) => {
  handleReadFile
    .then(data => {
      const newItem = JSON.parse(data).filter(item => item.completed === false)
      return handleWriteFile(newItem);
    })
    .then(() => console.log("Completed"))
    .catch(err => res.status(500).send(err))
})

module.exports = router;