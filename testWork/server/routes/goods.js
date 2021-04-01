const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const goods_controller = require('../controllers/goodsController')

router.get("/", auth, goods_controller.get_goods);

router.post("/", auth, goods_controller.add_goods);

router.put("/:id", auth, goods_controller.edit_goods);

router.delete("/:id", auth, goods_controller.delete_goods);

module.exports = router;
