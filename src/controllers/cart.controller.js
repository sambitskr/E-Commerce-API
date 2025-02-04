import CartItem from '../models/cart.model.js'
import Product from '../models/product.model.js'
import User from '../models/user.models.js'

//Adding a product to cart
export const addToCart = async (req, res, next) => {
    try {

        //receiving the user id from the request
        const userId = req.params.id

        //Destructing the name and seller of the product from the request
        const { name, seller, quantity = 1 } = req.body

        //getting the product id from the name and seller
        const productId = await Product.findOne({ name, seller })

        // Check if there exists a product or not
        if (!productId) {
            res.status(404).json({ message: "Product not found" })
            return
        }

        //If the product is already present in the cart, then increase its quantity otherwise add to cart
        const existingItem = await CartItem.findOne({ userId, productId: productId._id })

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity
            const updatedData = await CartItem.findByIdAndUpdate(existingItem._id, { quantity: newQuantity }, { new: true })
            res.status(200).json({
                message: "Quantity updated",
                Updated_Data: updatedData
            })
        }
        else {
            const newCartItem = new CartItem({
                userId,
                productId: productId._id,
                quantity
            })
            await newCartItem.save()
            res.status(201).json({ Message: "Item has been added to cart" })
        }
    } catch (err) {

    }
}

//View cart to check the total price for checkout purposes
export const getToCart = async (req, res, next) => {
    try {

        //receiving the user id from the request
        const userId = req.params.id

        
        const cartItems = await CartItem.find({ userId })
        if (!cartItems) {
            res.status(404).json({ message: "Cart is empty" })
            return
        }

        const productData = []
        let totalPrice = 0

        //Calculating the total price of the user according to the products present in the cart and its quantity
        for (let cartItem of cartItems) {
            let product = await Product.findById(cartItem.productId)
            let price = product.price * cartItem.quantity

            totalPrice += price
            productData.push({ name: product.name, seller: product.seller, price: product.price, quantity: cartItem.quantity })
        }

        const data = { productData, Totalprice: totalPrice }
        res.status(200).json(data)

    }
    catch (err) {
        next(err)

    }
}

//Deleting product from database 
export const deleteFromCart = async (req, res, next) => {
    try {
        
        //destructing the name and seller from the request body
        const { name, seller } = req.body

        //Storing the productId
        const product = await Product.findOne({name, seller})
        const productId = product._id

        //Storing the userId
        const userId = req.params.id

        //getting the cartId from product and userId
        let cartId = await CartItem.find({userId, productId})
        cartId = cartId._id

        const deleteCart = await CartItem.findOneAndDelete({cartId})

        if (!deleteCart) {
            res.status(404).json({ message: "Product not there in cart" })
            return
        }

        res.status(200).json({Message: "Cart Item Deleted"})

    }
    catch (err) {
        next(err)

    }
}