const express = require("express");
const router = express.Router();
const movies_controller = require('../controllers/moviesController')

router.get("/", movies_controller.get_movies);

router.post("/", movies_controller.add_movies);

router.delete("/:id", movies_controller.delete_movies);

module.exports = router;
