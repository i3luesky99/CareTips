const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet')
const userRoute = require('./routes/UserRoutes');
const authRoute = require('./routes/AuthRoutes');
const postRoute = require('./routes/PostRoutes');
const cateRoute = require('./routes/CategoryRoutes');
const multer = require('multer')
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

dotenv.config();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin" ,"*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

//connect MongoDB
mongoose.connect(process.env.DATABASE_ACCESS, ()=>{
  console.log('Database connected')
});

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());


//Upload File
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'images');
  },
  filename: (req, file, cb) =>{
    cb(null, req.body.name);
  },
})

const upload = multer({ storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) =>{
  res.status(200).json("File has been uploaded")
})

//API
app.use("/api/users",userRoute);
app.use("/api/auths",authRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",cateRoute);
app.use("/images", express.static(path.join(__dirname,"/images")))


app.listen(3001, () => {console.log("Server is running")});