const socket = require('./index');
const express = require("express");
const router = express.Router();
const {resolve} = require("path")
const fs = require("fs");
const {promisify} = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const handleWriteFile = item => writeFile(resolve(__dirname, "todo.json"), JSON.stringify(item));

//get todo
router.get("/", (req, res) => {
  readFile(resolve(__dirname, "todo.json"))
    .then(data => res.send(data))
    .catch(err => res.status(500).send("Error of getting data from server. Please contact support."))
})

//add todo
router.post("/todo", (req, res) => {
  readFile(resolve(__dirname, "todo.json"))
    .then(data => {
      const newItem = [...JSON.parse(data), req.body];
      return handleWriteFile(newItem);
    })
    .then(() => {
      res.send(req.body);
      socket.ioObject.emit("Change");
    })
    .catch(err =>
      res.status(500).send("Error of adding data. Please contact support."))
});

//delete todo
router.post("/todo/:id", (req, res) => {
  readFile(resolve(__dirname, "todo.json"))
    .then(data => {
      const {id} = req.body;
      const newItem = JSON.parse(data).filter(item => item.id !== id)
      return handleWriteFile(newItem);
    })
    .then(() => {
      res.send(req.body);
      socket.ioObject.emit("Change");
    })
    .catch(err => res.status(500).send("Error of deleting todo. Please contact support."))
})

//edit todo
router.put("/todo/:id", (req, res) => {
  readFile(resolve(__dirname, "todo.json"))
    .then(data => {
      const {id, text} = req.body;
      const newItem = JSON.parse(data).map((item) => {
        return item.id === id ? {...item, text} : item;
      });
      return handleWriteFile(newItem);
    })
    .then(() => {
      res.send(req.body);
      socket.ioObject.emit("Change");
    })
    .catch(err => res.status(500).send("Error of editing todo. Please contact support."))
})

//complete todo
router.put("/todo/complete/:id", (req, res) => {
  readFile(resolve(__dirname, "todo.json"))
    .then(data => {
      const {id} = req.body;
      const newItem = JSON.parse(data).map(item => {
        if (item.id === id) {
          const completed = item.completed !== true;
          return {...item, completed: completed}
        }
        return item
      })
      return handleWriteFile(newItem);
    })
    .then(() => {
      res.send(req.body);
      socket.ioObject.emit("Change");
    })
    .catch(err => res.status(500).send("Error of completing todo. Please contact support."))
})

module.exports = router;