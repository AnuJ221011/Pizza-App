const express = require('express');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');

const {addProduct, getProduct, deleteProduct} = require('../controllers/productController');
const uploader = require('../middleware/multerMiddleware');

const productRouter = express.Router();
productRouter.post('/', isLoggedIn, isAdmin, uploader.single('productImage'), addProduct); // Route to add a new product, using multer for file upload
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter; 

