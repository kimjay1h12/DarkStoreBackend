const db = require("mongoose")
const productModel = new db.Schema({
    name: {type: String, required: true},
    price: {type:Number,required: true},
    description: {type:String, required: true},
    image:{type: Array, required: true},
    brand: {type:String, required: true},
    category: {type:String, required: true},
    color:{type:Array, required: true},
    size: {type:Array, required: false},
    status:{type:Boolean, required: true},

    quantityAvailable: {type:Number,required: true},
    
})
const Product = db.model("Products",productModel)
module.exports = Product