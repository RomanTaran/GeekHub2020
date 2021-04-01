const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const Joi = require("joi");

exports.signup_user = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
    });
    const {error} = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});

    if (user) return res.status(400).send("Пользователь с такими данными уже существует...");

    const {name, email, password} = req.body;

    user = new User({name, email, password});

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const jwtSecretKey = process.env.HOME_BUH_APP_JWT_SECRET_KEY;
    const token = jwt.sign({_id: user._id, name: user.name, email: user.email}, jwtSecretKey);
    res.send(token);
  } catch (e) {
    res.status(500).send("Ошибка при регистрации. Перезагрузите страницу и попробуйте еще раз");
  }
}
