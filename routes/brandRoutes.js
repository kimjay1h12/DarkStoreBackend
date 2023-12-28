const express = require('express');
const brandController = require("../controllers/brandController");
const { AuthorizationValidation } = require('../validator/AuthorizationValidator');
const { IsAdminValidation } = require('../validator/IsAdmin');
const brandRouter = express.Router()
brandRouter.route("/brands").post(AuthorizationValidation,IsAdminValidation, brandController.createBrand)
brandRouter.route("/brands").get(brandController.getAllBrands)
brandRouter.route("/brands/:id").delete(AuthorizationValidation,IsAdminValidation, brandController.deleteBrandbyID)
module.exports = brandRouter