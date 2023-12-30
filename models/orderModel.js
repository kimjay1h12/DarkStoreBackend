const db = require("mongoose")
const orderSchema = new db.Schema({
    userId: {type: String, required: true},
    orders: {type: Array, required: true} 

})
const Order = db.model("Order",orderSchema)
module.exports = Order