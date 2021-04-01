const express = require("express");
const router = express.Router();
const signUp_controller = require('../controllers/signUpController');

router.post("/", signUp_controller.signup_user);

module.exports = router;
