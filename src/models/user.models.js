import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone_no: {
        type: Number,
        required: false, 
        unique: true,
    }, 
    profile_picture: {
        default: "",
        type: String
    },
    role:{
        type: String, 
        enum: ['GOD', 'ADMIN' , 'USER'],
        default: 'USER'
    },
    address: {
        type: String, 
        required: true
    }
}) 

const User = new mongoose.model('User', userSchema)

export default User 