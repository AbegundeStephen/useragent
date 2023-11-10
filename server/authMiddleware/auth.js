import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import usersModel from "../models/usersModel.js";

const auth = (asyncHandler(async(req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            throw new Error("You Are Not Authorized, Pleae Login")
        }



        const verified_token = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log("verified_token", verified_token)
        const user = await usersModel.findById(verified_token.id).select("-password")


        if (!user) {
            res.status(401)
            throw new Error("User Not Found")
        }

        req.user = user;
        next()
    }catch(error) {
        res.status(401)
        throw new Error("Not authorizeed, Please login")
    }
}))


export default auth;