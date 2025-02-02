import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'
import cookieParser from 'cookie-parser'; 
import cartRouter from './routes/cart.route.js'

const app = express()
app.use(cookieParser())
app.use(express.json())
dotenv.config()

const port = process.env.PORT

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to database")
}).catch((e) => {
    console.log(e)
})

app.listen(port, () => {
    console.log(`Listening at port ${port}...`)
})


app.use("/auth", authRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)

app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
