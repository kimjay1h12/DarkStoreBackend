const express = require('express');
const { searchProducts } = require('../controllers/searchController');
const searchRouter = express.Router()
searchRouter.route("/search").get(searchProducts)
module.exports = searchRouter