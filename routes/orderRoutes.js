const express = require('express');

const { AuthorizationValidation } = require('../validator/AuthorizationValidator');
const { createOrder, getOrders } = require('../controllers/orderController');

const orderRouter = express.Router()
orderRouter.route("/orders").post(AuthorizationValidation, createOrder)
orderRouter.route("/orders").get(AuthorizationValidation, getOrders)

module.exports = orderRouter