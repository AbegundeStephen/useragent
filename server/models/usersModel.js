import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const usersSchema = mongoose.Schema({
name: {
    type: String,
    required: [true, "please provide a name"]
},

email: {
    type: String,
    required: [true,"Please provide your email"],
    unique: true,
    trim: true,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, " Please provide a valid email"]
},

password : {
  type: String,
  required: [true, "Please provide a secure password"],
  minLength: [8, "Password must not be less than 8 characters"]
},

},{timestamps: true})


usersSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

export default mongoose.model("Users", usersSchema)