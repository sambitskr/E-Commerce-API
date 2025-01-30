import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'

dotenv.config()
const app = express()

const port = process.env.PORT

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to database")
}).catch((e) => {
    console.log(e)
})

app.listen(port, () => {
    console.log(`Listening at port ${port}...`)
})

app.use(express.json())

app.use("/auth", authRouter)

app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
