const express = require('express');

const {addProduct} = require('../controllers/productController');
const uploader = require('../middleware/multerMiddleware');

const productRouter = express.Router();
productRouter.post('/', uploader.single('productImage'), addProduct); // Route to add a new product, using multer for file upload

module.exports = productRouter; 

