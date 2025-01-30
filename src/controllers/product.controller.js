import Product from "../models/product.model.js";
import User from '../models/user.models.js'

export const addProduct = async (req, res, next) => {
    try {
        const isAdmin = await User.findById(req.user.id)
        if(isAdmin.role !== 'ADMIN') {
            res.status(403).json({Message: "Unaurthorized"})
            return
        }      

        const { name, description, quantity, seller, price, category, imageUrls } = req.body

        if (!name || !description || !seller || !price || !category || !imageUrls) {
            res.status(404).json({ Message: "All fields required" })
            return
        }

        if (quantity && !Number.isInteger(quantity)) {
            res.status(400).json({ message: "Invalid Quantity" })
            return
        }

        const newProduct = new Product({
            name,
            description,
            quantity,
            seller,
            price,
            category,
            imageUrls
        })

        await newProduct.save()
        res.status(201).json({ message: "Product has been added successfully!!" })


    } catch (err) {
        next(err)

    }
}