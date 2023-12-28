const express = require('express');
const categoryRouter = express.Router()
const categoryController =require("../controllers/categoryController");
const { AuthorizationValidation } = require('../validator/AuthorizationValidator');
const { IsAdminValidation } = require('../validator/IsAdmin');
categoryRouter.route("/category").post(AuthorizationValidation,IsAdminValidation, categoryController.createCategory)
categoryRouter.route("/category").get(categoryController.getAllCategories)
categoryRouter.route("/category/:id").delete(AuthorizationValidation,IsAdminValidation, categoryController.deleteCategorybyID)
module.exports = categoryRouter