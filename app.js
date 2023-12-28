const express = require('express');
const db = require("mongoose")
db.connect("mongodb+srv://akeem:akeem@test01.tfvusoh.mongodb.net/test01?retryWrites=true&w=majority").then((res)=>{console.log("database connected")}).catch((err)=>{console.log(err)})
const port = 8000
const cors = require('cors');
const app = express();
const router = require("./routes/userRoutes")
const productionRoutes = require("./routes/productsRoutes");
const cartRouter = require('./routes/cartRoutes');
const brandRouter = require('./routes/brandRoutes');
const categoryRouter = require('./routes/categoryRoutes');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use("/",router)
app.use("/",productionRoutes)
app.use("/",cartRouter)
app.use("/",brandRouter)
app.use("/",categoryRouter)


app.listen(port,()=>{
console.log('listening on port',port)
})