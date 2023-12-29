const express = require('express');
const productRouter = express.Router()
const {IsAdminValidation} = require("../validator/IsAdmin")
const productController = require("../controllers/productController");
const { AuthorizationValidation } = require('../validator/AuthorizationValidator');
productRouter.route("/products").post(AuthorizationValidation,IsAdminValidation, productController.CreateProduct)
productRouter.route("/products").get(productController.getAllProducts)
productRouter.route("/products/:id").get(productController.getProductById)
productRouter.route("/products/:id").delete(AuthorizationValidation, IsAdminValidation,productController.deleteProduct)
productRouter.route("/products/:id").patch(AuthorizationValidation,IsAdminValidation,productController.updateProduct)
productRouter.route("/products/brand/:brand").get(productController.getProductByBrand)
productRouter.route("/products/category/:category").get(productController.getProductByCategory)
module.exports = productRouter