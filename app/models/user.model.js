const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  passWord: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  birthDate: {
    type: String,
    require: true,
  },
  age: { type: Number },
  gender: {
    type: String,
    require: true,
  },
  address: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Address",
    },
  ],
  favorite: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
