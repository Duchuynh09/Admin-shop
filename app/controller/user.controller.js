const User = require("../models/user.model");
const { calculate_age } = require("../service/user.service");
exports.findOne = async (req, res, next) => {
  try {
    const idUser = req.params.id;
    const user = await User.findById(idUser);
    return res.send(user);
  } catch (error) {
    console.log(error);
  }
};
exports.create = async (req, res, next) => {
  const { firstName, lastName, phone, email, password, birthDate, gender } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !phone ||
    !birthDate ||
    !gender ||
    !email ||
    !password
  ) {
    return next(
      res.status(400).json({
        sucess: false,
        mes: "Missing inputs",
      })
    );
  }

  const response = await User.create({
    email: email,
    ...req.body,
    age: calculate_age(birthDate),
  });
  return res.status(200).json({
    sucess: response ? true : false,
    response,
  });
};
exports.update = async (req, res, next) => {
  const id = req.params.id;
};
exports.findAll = async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (err) {
    console.log(err.message);
  }
};
