const db = require("mongoose")
const brandSchema = new db.Schema({
    name:{
       type: String,required: true,
    },
    image:{
        type: String,required: true,
     },

})
const Brand = db.model("Brand",brandSchema)
module.exports = Brand