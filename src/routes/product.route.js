import express from 'express';
import { addProduct, deleteProduct } from '../controllers/product.controller.js';
import { verifyAdmin } from '../utils/verifyAdmins.js';

const router  = express.Router()

router.post('/create', verifyAdmin,  addProduct)
router.delete('/delete', verifyAdmin,  deleteProduct)

export default router