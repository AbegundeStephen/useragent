import mongoose from 'mongoose'


const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    token: {
        type: String,
        required: true,
    },

    createdAt:{
        type: Date,
        required: true,
    },

    expiresAt: {
        type: Date,
        required: true
    },
})

export default mongoose.model("Tokens", tokenSchema)