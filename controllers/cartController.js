const jwt = require("jsonwebtoken");
const Cart = require("../models/cartModel");
const User = require("../models/userModels");
const Products = require("../models/productModels");

exports.addToCart = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "d1CpSArCGc2fYw1VZ7uxG");

    const product = await Products.findById(req.body.productId);
    const userDetails = await User.findById(user.id);

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = await Cart.findOne({ userId: userDetails._id });
    // console.log({ ...product.toObject(), quantity: req.body.quantity });
    if (cart) {
      const existingProduct = cart.products.find((item) =>
        item._id.equals(product._id)
      );

      if (existingProduct) {
        existingProduct.quantity += req.body.quantity;
      } else {
        cart.products.push({
          ...product.toObject(),
          quantity: req.body.quantity,
        });
      }

      await cart.save();

      return res.status(200).json({
        message: "Product added to cart",
        data: cart,
      });
    } else {
      cart = await Cart.create({
        userId: userDetails._id,
        products: [{ ...product.toObject(), quantity: req.body.quantity }],
      });
    }

    res.status(200).json({
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
exports.getAllCart = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "d1CpSArCGc2fYw1VZ7uxG");
    const cart = await Cart.findOne({
        userId:user.id,
    });
    res.status(200).json({ message: "success", data: cart });
  } catch (error) {
    res.status(500).json({ message: "error getting cart", error: error });
  }
};
exports.deleteCartItem = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, "d1CpSArCGc2fYw1VZ7uxG");
    
        const product = await Products.findById(req.params.productId);
        const userDetails = await User.findById(user.id);
    
        if (!userDetails) {
          return res.status(404).json({ message: "User not found" }); 
        }
        else{
            let cart = await Cart.findOne({ userId: userDetails._id });
            const existingProduct = cart.products.find((item) =>
                item._id.equals(product._id)
            );
            if (existingProduct) {
                cart.products = cart.products.filter((item) =>
                    item._id.equals(product._id)
                );
                await cart.save();
                return res.status(200).json({
                    message: "cart item deleted successfully",
                    data: cart,
                });
            } else {
                res.status(404).json({
                    message: "product not found",
                    error: "Product not found",
                });
            }
        }
    
    } catch (error) {
        
    }
}
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "d1CpSArCGc2fYw1VZ7uxG");

    const product = await Products.findById(req.params.productId);
    const userDetails = await User.findById(user.id);

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = await Cart.findOne({ userId: userDetails._id });

    const existingProduct = cart.products.find((item) =>
      item._id.equals(product._id)
    );

    if (existingProduct) {
    let cart = await Cart.findOneAndUpdate({ userId: userDetails._id });

      existingProduct.quantity = existingProduct.quantity + req.body.quantity;
const updateItem = await Cart.findOneAndUpdate({ userId: userDetails._id},cart)
console.log("data", updateItem,cart)
    
    } else {
      res
        .status(404)
        .json({ message: "product not found", error: "Product not found" });
    }

    await cart.save();
    return res.status(200).json({
      message: "cart item quantity updated successfully ",
      data: cart,
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.deletAllCartItems = async(req,res)=>{
try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "d1CpSArCGc2fYw1VZ7uxG");

 
    const userDetails = await User.findById(user.id);


    let cart = await Cart.findOneAndDelete({ userId: userDetails._id });
   res.status(200).json({
    message: "cart deleted successfully",
    data: cart,
   })
} catch (error) {
    res.status(500).json({
        message: "Something went wrong",
        error: error.message,
    })
}
}