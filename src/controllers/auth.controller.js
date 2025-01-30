import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import User from '../models/user.models.js'
import jwt from 'jsonwebtoken'

//Creating a user 
export const signup = async (req, res, next) => {
    try {
        //destructing the details from the request body and storing them in each variable
        const { name, email, password, phone_no, address, role } = req.body

        //Check for required fields
        if (!name || !email || !password || !address) {
            res.status(400).json({ message: "Fill all mandatory fields" })
            return
        }

        //Check for already existing email
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            res.status(409).json({ message: "Email already existing" })
            return
        }

        //Check for already existing PhoneNo 
        const existingPhoneNo = await User.findOne({ phone_no })
        if (existingPhoneNo) {
            res.status(409).json({ message: "Phone no already existing" })
            return
        }

        // a salt is created for hashing of the password
        const salt = await bcryptjs.genSalt(10)

        //The password is hashed and saved in the database 
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone_no,
            address,
            role
        })

        await newUser.save()
        res.status(200).json({ message: "User registered" })

    } catch (err) {
        // console.log(error)
        // res.status(500).json({message: "Internal server error"})
        next(err);

    }

}

//Logging in Users 
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        //A Check for required fields
        if (!email || !password) {
            res.status(400).json({ message: "Fill both the mandatory fields" })
            return
        }

        //Retrieving and Storing the object of the user from email
        const validUser = await User.findOne({ email })

        //Check for not registered user in the database
        if (!validUser) {
            res.status(404).json({ message: "User not found" })
            return
        }

        //Check for Incorrect credential
        const validPassword = await bcryptjs.compare(password, validUser.password)
        if (!validPassword) {
            res.status(404).json({ message: "Incorrect credential" })
            return
        }

        //Retrieving the unique id generated by MongoDB for the user
        const id = validUser._id

        //Creating the token from the paylod (id) and secret jwt key in .env file 
        const token = jwt.sign({ id }, process.env.JWT_SECRET)

        //separating the password and getting only the rest of the details of the user
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)

    } catch (err) {
        next(err)
    }

}


