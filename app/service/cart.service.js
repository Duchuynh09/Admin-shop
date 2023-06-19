// const Cart = require("../models/cart.model");
// Sửa lại thành Class

exports.resetTotal = (cart) => {
  cart.total = cart.products
    .map((p) => p.total)
    .reduce((acc, next) => acc + next);
};
exports.update = (cart, quantity, product) => {
  cart.products[itemIndex].quantity = quantity;
  cart.products[itemIndex].total = parseInt(product.price * quantity);
  cart.products[itemIndex].updatedAt = new Date().now;
};
exports.addProduct = (cart, product) => {
  cart.products.push({
    productId: product._id,
    quantity: 1,
    price: product.price,
    total: product.price,
  });
};
