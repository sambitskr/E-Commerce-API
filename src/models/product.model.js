import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['FOOD', 'ELECTRONICS', 'COSMETICS', 'SANITARIES', 'STATIONARIES'],
        required: true
    },
    seller: {
        required: true,
        type: String
    },
    imageUrls: {
        type: Array,
        required: true
    }
})

const Product = new mongoose.model('Product', productSchema)
export default Product