const Brand = require("../models/brandModel")
exports.createBrand = async(req,res)=>{
    try{
        const brand = await Brand.create(req.body)

        res.status(200).json({
            message:"Brand Created Successfully",
            data:brand
        })
    }catch(error){
        res.status(400).json({message:"error creating brands",error:error.message})
    }
}
exports.getAllBrands = async(req,res)=>{
    try{
        const brands = await Brand.find()

        res.status(200).json({
            message:"All Brands",
            data:brands
        })
    }catch(error){
        res.status(400).json({message:"error getting brands",error:error.message})
    }
}
exports.deleteBrandbyID = async(req,res)=>{
    try {
        const deletedBrand = await Brand.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Brand Deleted Successfully",
            data:deletedBrand
        })
    } catch (error) {
        res.status(500).json({
            message:"error deleting brand",
            error:error
        })
    }
}
