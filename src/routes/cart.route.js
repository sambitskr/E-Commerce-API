import express from "express";
import { addToCart } from "../controllers/cart.controller.js";

const router = express.Router()

router.post('/add/:id', addToCart)

export default router 