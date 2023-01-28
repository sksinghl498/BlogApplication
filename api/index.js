const express= require("express");
const app= express();
require("dotenv").config();
const mongoose = require('mongoose');
const authRoutes= require('./routes/auth');
const userRoutes= require('./routes/users');
const postRoutes= require("./routes/posts");
const catRoutes = require('./routes/categories');
const multer = require("multer");
var cors = require('cors')
const path= require("path");


app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to database")).catch((err)=> console.log(err));

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"images");
    },
    filename: (req,file,cb)=>{
        cb(null, req.body.name);
    },
})


const upload= multer({storage: storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})


app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/categories",catRoutes);
app.listen(5000,()=>{
    console.log("Sever is running on http://localhost:5000");
})