import express from "express";
import { addToCart, getToCart, deleteFromCart, deleteFromCartByOne } from "../controllers/cart.controller.js";

const router = express.Router()

router.post('/add/:id', addToCart)
router.get('/get/:id', getToCart)
// router.delete('/delete/:id', deleteFromCart)
router.delete('/delete/:id', deleteFromCartByOne)

export default router 