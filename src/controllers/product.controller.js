import Product from "../models/product.model.js";
import User from '../models/user.models.js'

//Adding a Product to DB
export const addProduct = async (req, res, next) => {
    try {

        //Checking if the client is an admin or not
        const isAdmin = await User.findById(req.user.id)
        if (isAdmin.role !== 'ADMIN') {
            res.status(403).json({ Message: "Unaurthorized" })
            return
        }

        //destructing the details from the request body and storing them in each variable
        const { name, description, quantity, seller, price, category, imageUrls } = req.body


        //Check for required fields
        if (!name || !description || !seller || !price || !category || !imageUrls) {
            res.status(404).json({ Message: "All fields required" })
            return
        }

        //Creating an object of the product details and saving it in the database
        const newProduct = new Product({
            name,
            description,
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

//Deleting a product from DB
export const deleteProduct = async (req, res, next) => {
    try {

        //Checking if the client is an admin or not
        const isAdmin = await User.findById(req.user.id)
        if (isAdmin.role != 'ADMIN') {
            res.status(403).json({ message: "Unauthorized" })
            return
        }

        //destructing the name and seller from the request body and storing them in each variable
        const { name, seller } = req.body

        // Deleting the product from the DB
        const deletedProduct = await Product.findOneAndDelete({ name, seller })

        //if product not found
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" })
            return
        }

        //response message sent
        res.status(200).json({ message: "Product Deleted Successfully" })

    } catch (err) {
        next(err)
    }
}

//Updating a product in the database
export const updateProduct = async (req, res, next) => {
    try {
        //Checking if the client is an admin or not for authorization
        const isAdmin = await User.findById(req.user.id)
        if (isAdmin.role !== 'ADMIN') {
            res.status(403).json({ Message: "Unaurthorized" })
            return
        }

        //Updating the product details by getting it from product id
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }

        )

        res.status(200).json(updatedProduct)

    } catch (err) {
        next(err)
    }
}

// Getting the product 
// export const getProduct = async (req, res, next) => {
//     try {

//         //Searching from the product's name and category
//         const name = req.query.name || ''
//         const category = req.query.category || ''

//         //If none of them are provided
//         if (!name && !category) {
//             res.status(400).json({ Message: "No Search Query received" })
//             return
//         }

//         let searchResults

//         //If only name is provided
//         if (name && !category) {
//             searchResults = await Product.find({
//                 name: { $regex: name, $options: 'i' }
//             })
//         }
//         //If only category is provided
//         else if (!name && category) {
//             searchResults = await Product.find({ category })

//         }
//         // If both of them are provided
//         else {
//             searchResults = await Product.find({
//                 name: { $regex: name, $options: 'i' },
//                 category
//             })
//         }

//         res.status(200).json(searchResults)

//         //If no product is found
//         if (!searchResults.length) {
//             res.status(200).json({ message: "No products found" })
//         }

//     }
//     catch (err) {
//         next(err)
//     }
// }

//Getting the product with pagination
export const getProduct = async (req, res, next) => {
    try {
        const name = req.query.name || ''
        const category = req.query.category || ''
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const query = {};
        if (name) query.name = { $regex: name, $options: 'i' };
        if (category) query.category = category

        // Fetch products with pagination
        const products = await Product.find(query)
            .skip((page - 1) * limit) 
            .limit(limit); 

        // Get total count of matching products
        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            products,
        });

    } catch (err) {
        next(err);
    }
};

