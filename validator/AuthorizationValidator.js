const jwt = require("jsonwebtoken")
exports.AuthorizationValidation = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, "d1CpSArCGc2fYw1VZ7uxG")
       
        req.user = decoded
        next()
    } catch (err) {
        res.status(403).json({
            status: "Fail",
            message: "Not Authorized",
        })
    }
}