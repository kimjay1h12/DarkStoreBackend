const Brand = require("../models/brandModel");
const Product = require("../models/productModels");

exports.searchProducts = async (req, res) => {
  try {
    // Convert the search parameter to lowercase
    const searchParam = req.query.find.toLowerCase();

    // Perform the search using the lowercase parameter
    const products = await Product.find({ name: { $regex: new RegExp(searchParam, 'i') } });

    const brands = await Brand.find({ name: { $regex: new RegExp(searchParam, 'i') } });

    res.status(200).json({ message: "success", data:{ products ,brands } });
  } catch (error) {
    res.status(500).json({ message: "error getting products", error: error });
  }
};
