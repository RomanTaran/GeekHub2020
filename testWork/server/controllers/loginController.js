const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

exports.login_user = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
    });

    const {error} = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Неверный email или пароль...");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(400).send("Неверный email или пароль...");

    const jwtSecretKey = process.env.HOME_BUH_APP_JWT_SECRET_KEY;
    const token = jwt.sign({_id: user._id, name: user.name, email: user.email}, jwtSecretKey)

    res.send(token);
  } catch (e) {
    res.status(500).send("Ошибка авторизации. Перезагрузите страницу и попробуйте еще раз");
  }

}
