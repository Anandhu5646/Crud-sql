import express from "express";
import cookieParser from "cookie-parser";
import './config/dbConnect.js'
import path from "path";
import authRouter from "./routes/authRoute.js";
import adminRouter from "./routes/adminRoute.js"

const app=express()
const PORT=3000


app.use(express.json())
app.use(cookieParser({ limit: '10mb' }));
app.use(express.urlencoded({ extended:false ,limit: '10mb'}));
app.use(express.static(path.resolve() + "/public"));
app.use("/admin", adminRouter)
app.use("/auth", authRouter)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});      