const Product = require("../models/product.model");
const ApiError = require("../api.error");
const { ObjectId } = require("mongodb");
exports.findALl = async (req, res, next) => {
  const response = await Product.find();
  return res.send(response);
};
exports.findOne = async (req, res, next) => {
  const id = req.params.id;
  const response = await Product.findOne({
    _id: new ObjectId(id),
  });
  return res.status(200).json({ success: response ? true : false, response });
};
exports.create = async (req, res, next) => {
  const {
    title,
    price,
    category,
    brand,
    // description,
    // discountPercentage,
    // thumbnail,
    // images,
  } = req.body;

  if (!title || !price || !brand || !category) {
    return next(
      res.status(403).json({ success: false, message: "missing inputs" })
    );
  }
  try {
    const response = await Product.create({ title: title, ...req.body });
    return res.status(200).json({ success: response ? true : false, response });
  } catch (error) {
    return next(res.send("Trung ten san pham"));
  }
};
exports.update = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await Product.findByIdAndUpdate(
      new ObjectId(id) ,
      {...req.body }
    );
    return res.status(200).json({ success: response ? true : false, response });
  } catch (error) {
    return next(res.send("San pham khong ton tai"));
  }
};
exports.delete = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await Product.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: response ? true : false, response });
  } catch (error) {
    return next(res.send("San pham khong ton tai"));
  }
  // await Product.deleteMany();
  // return res.send(await Product.deleteMany());
};
exports.checkProductStock = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const productDetails = await Product.findById(productId);
    if (productDetails.stock > 0) {
      req.body.product = productDetails;
      return next();
    }
    return res.send(new ApiError(500, "San pham het"));
  } catch (error) {
    console.log(error.message);
  }
};
