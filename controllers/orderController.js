const Order = require("../models/orderModel");
const User = require("../models/userModels");
const Products = require("../models/productModels");
const jwt = require("jsonwebtoken");

exports.createOrder = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "d1CpSArCGc2fYw1VZ7uxG");

    const userDetails = await User.findById(user.id);

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    let order = await Order.findOne({ userId: userDetails._id });

    if (!order) {
      order = await Order.create({
        userId: userDetails._id,
        orders: [{item:req.body,status:"Pending"}],
      });
    } else {
      order.orders.push({ item:req.body,status:"Pending" });
      await order.save();
    }

    res.status(200).json({
      message: "Order Created successfully",
      data: order,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
exports.getOrders = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, "d1CpSArCGc2fYw1VZ7uxG");
        const order = await Order.findOne({
            userId:user.id,
        });
        res.status(200).json({ message: "success", data: order });
      } catch (error) {
        res.status(500).json({ message: "error getting cart", error: error });
      }
}