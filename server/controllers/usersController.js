import usersModel from "../models/usersModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import tokenModel from "../models/tokenModel.js";
import crypto from 'crypto'
import asyncHandler from 'express-async-handler'


const generateToken = (id) => {
    let token = jwt.sign({id}, process.env.JWT_SECRET_KEY)
    return token
}

//Register User

export const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all required fields")

    }

    if (password.length < 8) {
        res.status(400);
        throw new Error("Passsword must not be less than 8 characters")

    }

    const checked_mail = await usersModel.findOne({email})

    if (checked_mail) {
        res.status(400);
        throw new Error("Email already exist")
    }

    const new_user = await usersModel.create({name, password, email})
    const token = generateToken(new_user._id)

    res.cookie("token", token, {
        path: "/",
        httpOnly:true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite:"none",
        secure:true
    });


    if(new_user) {
        const {_id, name, email} = new_user
        res.status(200).json({_id, name, email,})
    }else {
        res.status(400);
        throw new Error("No User Data Found")
    }


});



export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in the required field")
  }

  const user_exist = await usersModel.findOne(email)
  if (!user_exist) {
    res.status(400);
    throw new Error("User not found, please sign-up")
  }

  const correct_password = await bcrypt.compare(password, user_exist.password);
  const token = generateToken(user_exist._id)
  if (correct_password) {
    res.cookie("token", token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    });


    if (user_exist && correct_password) {
        const {_id, name, email} = user_exist
        res.status(200).json({_id, name, email})
    }else {
        res.status(400);
        throw new Error("No record found in the database")
    };
  };


});


export const logOut = asyncHandler(async (req,res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });

    res.status(200).json({message: "Logged Out successfully"})
})


export const updateUser = asyncHandler(async (req, res) => {
    const user = await usersModel.findById(req.user._id);

    if (user) {
        const {name, email,} = user
        user.email = email;
        user.name = req.body.name || name;

        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })

    }else {
        res.status(404);
        throw new Error("User Not Found")
    }

})


export const changePassword = asyncHandler(async (req, res) => {
    const user = await usersModel.findById(req.user._id);
    const {old_password, new_password} = req.body;

    if (!user) {
        res.status(400);
        throw new Error("User Not Found, Please sign up");

    }

    if(!old_password || !new_password) {
        res.status(400);
        throw new Error("Please provide your old and new password")
    }

    const correct_password = await bcrypt.compare(old_password, user.password)

    if (user && correct_password) {
        user.password = new_password
        await user.save();
        res.status(200).json("Password changed successfully")
    }else {
        res.status(400);
        throw new Error("Old password is not correct")
    }


})



export const forgotPassword = asyncHandler(async (req,res) => {
    const{email}  = req.body;
    const user = await usersModel.findOne({email})

    if (!user) {
        res.status(400);
        throw new Error("User Does Not Exist")
    }

    let token = await tokenModel.findOne({userId:user._id})
    if (token) {
        await token.deleteOne()
    }

    let reset_token = crypto.randomBytes(32).toString('hex') + user._id;
    console.log("reset_token", reset_token)


    const hashed_token =  crypto.createHash("sha256").update(reset_token).digest("hex");


    await new tokenModel({
        userId: user._id,
        token: hashed_token,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60*1000)


        }).save()


        const reset_url = `${process.env.FRONTEND_URL}/resetpassowrd/${reset_token}`
        const message =  `
        <h2>Hello ${user.name}</h2>
        <p> Please use the url below to reset your password</p>
        <p> This reset link is only valid for 30 mins</p>
        <a href=${reset_url} clickTracking=off>${reset_url}</a>
        <p>User Agent</p>
        `;

        const subject = "Password  Reset Request";
        const send_to = user.email;
        const sent_from = process.env.EMAIL_USER


        try {
            await send_mail(subject, message,send_to,sent_from)
            res.status(200).json({success: true, message:"Reset Email Sent"})
        }catch(error) {
            res.status(500);
            throw new Error("Email Not Sent, Try Again")

        }
});

export const resetPassword = asyncHandler(async (req, res) => {
    const {password} = req.token
    const {resetToken} = req.params;

    const hashed_token = crypto.createHash('sha256').update(resetToken).digest("hex")

    const user_token = await tokenModel.findOne({
        token: hashed_token,
        expiresAt: {$gt:Date.now()}
    })

    if (!user_token) {
        res.status(404);
        throw new Error("Invalid or expired Token")
    }

    const user = await usersModel.findOne({_id:user_token.userId});
    user.password = password
    await user.save();
    res.status(200).json({
        message:"Password Reset successful, Please Login",
    })
})