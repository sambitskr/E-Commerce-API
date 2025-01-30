import express from 'express';
import { addProduct } from '../controllers/product.controller.js';
import { verifyAdmin } from '../utils/verifyAdmins.js';

const router  = express.Router()

router.post('/create', verifyAdmin,  addProduct)

export default router