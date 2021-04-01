const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const dates_controller = require('../controllers/datesController')

router.get("/", auth, dates_controller.get_dates);

router.post("/", auth, dates_controller.add_dates);

router.put("/:id", auth, dates_controller.edit_dates);

router.delete("/:id", auth, dates_controller.delete_dates);

module.exports = router;
