const Product = require("../models/product.model");
const { ObjectId } = require("mongodb");
exports.minusStock = async (cart) => {
  cart.delivered = true;
  cart.products.map((pro) => {
    updateProduct(pro.productId._id, pro.quantity);
  });
  cart.save();
};
const updateProduct = async (proId, quantity) => {
  const product = await Product.findById(new ObjectId(proId));
  product.stock -= quantity;
  product.save();
};
