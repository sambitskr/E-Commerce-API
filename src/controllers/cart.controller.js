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

        const productId = await Product.findOne({ name, seller })

        if (!productId) {
            res.status(404).json({ message: "Product not found" })
            return
        }

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

export const getToCart = async (req, res, next) => {
    try {
        const userId = req.params.id
        const cartItems = await CartItem.find({userId})
        if (!cartItems) {
            res.status(404).json({ message: "Cart is empty" })
            return
        }

        const productData = []
        let totalPrice = 0

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

export const DeleteFromCart = async (req, res, next) => {
    try {
                      

    }
    catch (err) {
        next(err)

    }
}