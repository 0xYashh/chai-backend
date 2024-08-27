import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true
})) 
//express config
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: tue,limit:"16kb"}))
app.use(express.static("public")) //for images and other stuffs
app.use(cookieParser())
 
export { app }