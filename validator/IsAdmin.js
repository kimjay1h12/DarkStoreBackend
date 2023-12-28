const jwt = require("jsonwebtoken")

const User = require("../models/userModels");
exports.IsAdminValidation = async(req,res,next)=>{
    try {
        const user = jwt.verify(
          req.headers.authorization.split(" ")[1],
          "d1CpSArCGc2fYw1VZ7uxG"
        );
    // console.log(user);
        const userDetails = await User.findById(user.id);
        if (userDetails.isAdmin ===true) {
        next()
        } else {
          res.status(500).json({ message: "only an admin can perform this action", error: "you are not allowed to perform this action" });
        }
      } catch (error) {
        res.status(500).json({ message: "error", error: error });
      }
}