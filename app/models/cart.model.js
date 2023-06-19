const mongoose = require("mongoose");
let ItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less then 1."],
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});
mongoose.model("item", ItemSchema);

const cartSchema = new mongoose.Schema(
  {
    products: [ItemSchema],
    total: Number,
    discountedTotal: Number,
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    totalProducts: Number,
    totalQuantity: Number,
    order: {
      type: Boolean,
      default: false,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Cart", cartSchema);
