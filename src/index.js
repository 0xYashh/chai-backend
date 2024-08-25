//FIRST APPROACH TO CONNECT TO DB (MERN)
/*
import mongoose from "mongoose";
import {DB_NAME} from "./constants"

import  express from "express"
const app = express()
;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",() =>{
            console.log("application not able to talk to DB",error)
            throw error
        })
        app.listen(process.env.PORT,() => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch(error){
        console.error(
        "ERROR",error)
        throw err
    }
})()
*/


//OTHER APPROACH IS WE IMPORT FROM DB
//require('dotenv').config({path:'./env'}) OR FOR BETTER CONSISTENCY IN CODE , MADE SOME CHANGES IN PACKAGE.JSON 

import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path:'./env'
})

connectDB()