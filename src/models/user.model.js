import mongoose, { Schema } from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true //optimising searching
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullname: {
            username: {
                type: String,
                required: true,
                trim: true,
                index: true //optimising searching
            },
            avatar: {
                type: String, //cloudinary url
                required: true,

            },
            coverImage: {
                type: String, //cloudinary url,
            },
            watchHistory: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Video"
                }
            ],
            password: {
                type: String,
                required: [true, "password is required"]
            },
            refreshToken: {
                type: String
            }
        }


    }, { timestamps: true })

//pre hook is a method to execute codes before running the main task like user entering any data , saving any info just before that.

//we dont use here callback for our func , and use async because it takes time
//since middleware so using next to pass the flag when our work is done
userSchema.pre("save", async function (next) {
    // if(this.isModified("password")){
    //     this.password = bcrypt.hash(this.password, 10) //10 is hashround
    //  next()
    // }
    //or
    if (!this.isModified("password")) return next(); //that is dont execute the bcrypt method.

    this.password = bcrypt.hash(this.password, 10) //10 is hashround
    next()
    //now the problem is whenever user change the password it calls pre hook before saving the data. so using if condition


})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
//cryptography so it takes time so using await.
//this.password is encrypted one and password is user one


userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.REFRESH_TOKEN_EXPIRY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);

