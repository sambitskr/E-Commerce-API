import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true

    }, quantity: {

        type:Number,
        default: 1
 
    }
})

const CartItem = new mongoose.model('cartItem', cartSchema)
export default CartItem