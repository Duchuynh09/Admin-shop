const { ObjectId } = require("mongodb");
const Cart = require("../models/cart.model");
const ApiError = require("../api.error");
const CartService = require("../service/cart.service");
const { minusStock } = require("../service/product.service");
exports.exist = async (req, res, next) => {
  const { userId, product } = req.body;
  try {
    const cart = await Cart.findOne({ userId: userId });
    if (cart) {
      req.body.cart = cart;
      return next();
    }
    const data = await Cart.create({
      userId: userId,
      products: [
        {
          productId: product._id,
          quantity: 1,
          price: product.price,
          total: parseInt(product.price),
        },
      ],
      total: parseInt(product.price),
    });
    return res.status(200).json({
      message: `Create a new cart for user with id: ${userId} `,
      cart: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.add = async (req, res) => {
  const { cart, quantity, product } = req.body;
  try {
    const itemIndex = cart.products.findIndex((p) => {
      return p.productId.toString() == product._id.toString();
    });
    if (itemIndex != -1) {
      if (quantity > 0) {
        CartService.update(cart, quantity, product);
        CartService.resetTotal(cart);
      } else {
        cart.products.splice(itemIndex, 1);
        CartService.resetTotal(cart);
      }
    } else {
      if (quantity == 1) {
        CartService.addProduct(cart, product);
        CartService.resetTotal(cart);
      }
    }
    cart.save();
    return res.send({ cart });
  } catch (error) {
    return res.send(error.message);
  }
};
exports.findAll = async (req, res) => {
  const carts = await Cart.find().populate([
    { path: "userId" },
    { path: "products", populate: { path: "productId" } },
  ]);
  return res.send(carts);
};
exports.findOne = async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await Cart.findOne({ userId: userId }).populate([
      {
        path: "userId",
      },
      {
        path: "products",
        populate: {
          path: "productId",
        },
      },
    ]);
    return cart
      ? res.status(202).json({ cart })
      : res.send(new ApiError(404, "Khong tim thay cart"));
  } catch (error) {}
};
exports.delivered = async (req, res) => {
  const { userId } = req.body;
  const cart = await Cart.findOne({ userId: userId });
  minusStock(cart);
  return cart
    ? res.status(202).json({ cart })
    : res.send(new ApiError(404, "Khong tim thay cart"));
};
exports.order = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await Cart.findByIdAndUpdate(
      { _id: new ObjectId(cartId) },
      { $set: { order: true } },
      { returnDocument: "after" }
    );
    return cart
      ? res.status(202).json({ cart })
      : res.send(new ApiError(404, "Khong tim thay cart"));
  } catch (error) {
    console.log(error.message);
  }
};
exports.delete = async (req, res) => {
  const { userId } = req.body;
  await Cart.deleteOne({ userId: new ObjectId(userId) });
  return res.status(202).json({
    message: "Xoa thanh cong",
    userId: userId,
  });
};
