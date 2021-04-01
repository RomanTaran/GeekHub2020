const {Types} = require("../models/type");

exports.get_types = async (req, res, next) => {
  try {
    const types = await Types.find();
    const filteredTypes = types.filter(type => type.uid === req.user._id)
    res.send(filteredTypes);
  } catch (error) {
    res.status(500).send("Внутренняя ошибка сервера. Перезагрузите страницу");
  }
}

exports.add_types = async (req, res) => {
  try {
    const {uid, type, reduct} = req.body;
    let types = new Types({uid, type, reduct});
    types = await types.save();
    res.send(types);
  } catch (error) {
    res.status(500).send("Внутренняя ошибка сервера. Перезагрузите страницу");
  }
}

exports.edit_types = async (req, res) => {
  try {
    const types = await Types.findById(req.params.id);

    if (!types) return res.status(404).send("Тип не найден в базе данных...");

    if (types.uid !== req.user._id)
      return res.status(401).send("Обновление типов невозможно. Вы не авторизованы...");

    const {uid, type, reduct} = req.body;

    const updatedTypes = await Types.findByIdAndUpdate(
      req.params.id,
      {uid, type, reduct},
      {new: true}
    );

    res.send(updatedTypes);
  } catch (error) {
    res.status(500).send("Внутренняя ошибка сервера. Перезагрузите страницу");
  }

}

exports.delete_types = async (req, res) => {
  try {
    const type = await Types.findById(req.params.id);
    if (!type) return res.status(404).send("Тип не найден в базе данных...");
    if (type.uid !== req.user._id)
      return res.status(401).send("Обновление типов невозможно. Вы не авторизованы...");

    const deletedType = await Types.findByIdAndDelete(req.params.id);
    res.send(deletedType);
  } catch (error) {
    res.status(500).send("Внутренняя ошибка сервера. Перезагрузите страницу");
  }
}
