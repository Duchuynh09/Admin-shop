const mongooes = require("mongoose");

const productSchema = new mongooes.Schema({
  title: { type: String, require: true, unique: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  discountPercentage: { type: Number },
  rating: Number,
  stock: Number,
  rating: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: Array,
});

module.exports = mongooes.model("Product", productSchema);
