import express from "express";
import { addToCart, getToCart, deleteFromCart } from "../controllers/cart.controller.js";

const router = express.Router()

router.post('/add/:id', addToCart)
router.get('/get/:id', getToCart)
router.delete('/delete/:id', deleteFromCart)

export default router 