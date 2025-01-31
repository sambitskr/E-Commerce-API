import CartItem from '../models/cart.model.js'
import Product from '../models/product.model.js'
import User from '../models/user.models.js'

export const addToCart = async (req, res, next) => {
    try {
        const userId = req.params.id
        const { name, seller, quantity = 1 } = req.body

        const productId = await Product.findOne({ name, seller })

        if (!productId) {
            res.status(404).json({ message: "Product not found" })
            return
        }

        const existingItem = await CartItem.findOne({ userId, productId: productId._id })

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity
            await CartItem.findByIdAndUpdate(existingItem._id, { quantity: newQuantity })
            res.status(200).json({ message: "Quantity updated" })
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