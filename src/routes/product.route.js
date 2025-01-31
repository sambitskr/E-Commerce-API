import express from 'express';
import { addProduct, deleteProduct, getProduct, updateProduct } from '../controllers/product.controller.js';
import { verifyAdmin } from '../utils/verifyAdmins.js';

const router  = express.Router()

router.post('/create', verifyAdmin,  addProduct)
router.delete('/delete', verifyAdmin,  deleteProduct)
router.put('/update/:id', verifyAdmin, updateProduct )
router.get('/get', getProduct)


export default router