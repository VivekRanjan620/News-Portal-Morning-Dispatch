import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"

dotenv.config()
const uri = process.env.MONGO_URI;

// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log("Database is connected")
// }).catch((err)=>{
//     console.log("Database error")
// })

mongoose
  .connect(uri)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database error", error));


const app = express();

// for allowing json object in req body
app.use(express.json())
app.use(cookieParser())

app.listen(5000, () => {
  console.log("Server is running on port:5000!");
});

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal server Error"

  res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  })
})