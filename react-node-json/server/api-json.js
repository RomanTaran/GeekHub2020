const express = require("express");
const router = express.Router();
const {resolve} = require("path")
const fs = require("fs");
const {promisify} = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

router.get("/", (req, res) => {
  readFile(resolve(__dirname, "todo.json"))
    .then((data) => res.send(data))
    .catch((err) => {console.error(err); res.status(500).send(err)})
})

router.post("/", (req, res) => {
  readFile(resolve(__dirname, "todo.json"))
    .then((data) => {
      const newItem = [...JSON.parse(data), req.body];
      writeFile(resolve(__dirname, "todo.json"), JSON.stringify(newItem))
        .then(() => res.send(req.body))
        .catch((err) => {console.error(err); res.status(500).send(err)});

    })
    .catch((err) => {console.error(err); res.status(500).send(err)})
});

router.post("/todo/:id", (req,res)=> {
  readFile(resolve(__dirname, "todo.json"))
    .then((data) => {
      const {id} = req.body;
      const newItem = JSON.parse(data).filter(item => item._id !== id)
      writeFile(resolve(__dirname, "todo.json"), JSON.stringify(newItem))
        .then(() => res.send(req.body))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
})

router.put("/todo/:id", (req, res) => {
  readFile(resolve(__dirname, "todo.json"))
    .then((data) => {
      const {_id} = req.body;
      const newItem = JSON.parse(data).map((item) => {
        if (item._id === _id) {
          return req.body;
        } else {
          return item
        }
      });
      writeFile(resolve(__dirname, "todo.json"), JSON.stringify(newItem))
        .then(() => res.send(req.body))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
})

module.exports = router;