const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const types_Controller = require('../controllers/typesController');


router.get("/", auth, types_Controller.get_types);

router.post("/", auth, types_Controller.add_types);

router.put("/:id", auth, types_Controller.edit_types);

router.delete("/:id", auth, types_Controller.delete_types);

module.exports = router;
