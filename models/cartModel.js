const db = require("mongoose")
const cartModel = new db.Schema({
    userId: {type: String, required: true},
    products: {type: Array, required: true} 
})
const Cart = db.model("Cart",cartModel)
module.exports = Cart