const Product = require("../models/productModels")
const Products = require("../models/productModels")
exports.CreateProduct = async(req, res) => {
   try {
    const product = await Product.create(req.body)
    // console.log(product)
    res.status(200).json({message: "success", data: product})
   } catch (error) {
    res.status(500).json({message: "error creating product", error: error})
   }
}
exports.getAllProducts = async(req, res) => {
    try {
        const products = await Products.find()
        res.status(200).json({message: "success", data: products})
    } catch (error) {
        res.status(500).json({message: "error getting products", error: error})
    }
}
exports.getProductById = async(req, res) => {
    try {
        const product = await Products.findById(req.params.id)
        if(product != null){

            res.status(200).json({message: "success", data: product})
        }
        else{
            res.status(404).json({message: "product not found",error: "Product not found"})
        }
    } catch (error) {
        res.status(500).json({message: "error getting product", error: error})
    }
}

exports.deleteProduct =async(req,res)=>{
    try {
        const product = await Products.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "success", data: product})
    } catch (error) {
        res.status(500).json({message: "error deleting product", error: error})
    }
}
exports.updateProduct = async(req, res) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({message: "success", data: product})
    } catch (error) {
        res.status(500).json({message: "error updating product", error: error})
    }
}