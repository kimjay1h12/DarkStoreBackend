const db = require("mongoose")
const categorySchema = new db.Schema({
    name:{
       type: String,required: true,
    },
    image:{
        type: String,required: true,
     },

})
const Category = db.model("Category",categorySchema)
module.exports = Category