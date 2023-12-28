const Category = require("../models/categoryModel")
exports.createCategory = async(req,res)=>{
    try{
        const category = await Category.create(req.body)

        res.status(200).json({
            message:"Category Created Successfully",
            data:category
        })
    }catch(error){
        res.status(400).json({message:"error creating Categories",error:error.message})
    }
}
exports.getAllCategories = async(req,res)=>{
    try{
        const categories = await Category.find()

        res.status(200).json({
            message:"All Categories",
            data:categories
        })
    }catch(error){
        res.status(400).json({message:"error getting categories",error:error.message})
    }
}
exports.deleteCategorybyID = async(req,res)=>{
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Category Deleted Successfully",
            data:deletedCategory
        })
    } catch (error) {
        res.status(500).json({
            message:"error deleting category",
            error:error
        })
    }
}
