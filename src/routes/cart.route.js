import express from "express";
import { addToCart, getToCart } from "../controllers/cart.controller.js";

const router = express.Router()

router.post('/add/:id', addToCart)
router.get('/get/:id', getToCart)

export default router 