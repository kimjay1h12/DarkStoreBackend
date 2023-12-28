const express = require('express');
const cartController = require("../controllers/cartController");
const { AuthorizationValidation } = require('../validator/AuthorizationValidator');
const cartRouter = express.Router()
cartRouter.route("/cart").post(AuthorizationValidation,cartController.addToCart)
cartRouter.route("/cart").get(AuthorizationValidation,cartController.getAllCart)
cartRouter.route("/cart/:productId").patch(AuthorizationValidation,cartController.updateCartItemQuantity)
cartRouter.route("/cart/:productId").delete(AuthorizationValidation, cartController.deleteCartItem)
cartRouter.route("/cart").delete( AuthorizationValidation,cartController.deletAllCartItems)
module.exports = cartRouter