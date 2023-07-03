const router = require("express").Router();
const UserControllers = require("../controller/user.controller");
const ProductControllers = require("../controller/product.controller");
const CartControllers = require("../controller/cart.controller");

//Default product route
router
  .route("/")
  .get(ProductControllers.findALl)
  .post(ProductControllers.create);
// Cart route
// .get(CartControllers.findAll)
router
  .route("/cart")
  .get(CartControllers.findAll)
  .post(
    ProductControllers.checkProductStock,
    CartControllers.exist,
    CartControllers.add
  )
  .delete(CartControllers.delete)
router
  .route("/cart/:id")
  .get(CartControllers.findOne)
  .patch(CartControllers.order);

// User route
router
  .route("/users")
  .get(UserControllers.findAll)
  .post(UserControllers.create)
  .patch(UserControllers.update);
// .put(UserControllers.update);
router
  .route("/users/:id")
  .get(UserControllers.findOne)
  .post(UserControllers.create)
  .put(UserControllers.update);
router
  .route("/:id")
  .get((req, res) => {
    res.send("findOne products");
  })
  .patch(ProductControllers.update)
  .delete(ProductControllers.delete);

module.exports = router;
