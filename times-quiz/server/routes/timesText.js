const express = require("express");
const router = express.Router();
const timesText_controller = require('../controllers/timesTextController')

router.get("/",timesText_controller.get_timesText);

module.exports = router;
