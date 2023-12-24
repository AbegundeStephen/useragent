import {Router}from 'express'
import { changePassword, forgotPassword, logOut, loginUser, resetPassword, registerUser, updateUser } from '../controllers/usersController.js';
import auth from '../authMiddleware/auth.js';


const userRoutes = Router();

userRoutes.post("/register", registerUser)
userRoutes.post("/login", loginUser)
userRoutes.get("/logout", logOut)
userRoutes.patch("/updateuser", auth, updateUser)
userRoutes.patch("/changepassword", auth, changePassword)
userRoutes.post("forgotpassword", forgotPassword)
userRoutes.put("/resetpassword/:resetToken", resetPassword)

export default userRoutes
