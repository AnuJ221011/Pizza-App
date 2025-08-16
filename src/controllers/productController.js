const {createProduct, getProductById, deleteProductById} = require('../services/productService');
const AppError = require('../utils/appError');

async function addProduct (req, res) {
    try {
        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file?.path,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            inStock: req.body.inStock
        })
        return res.status(201).json({
            message: 'Product created successfully',
            success: true,
            data: product,
            error: {}
        });
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                error: error,
                success: false,
                data: {}
            });
        }
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error,
            success: false,
            data: {}
        });
    }
}

async function getProduct(req, res) {
    try {
        const response = await getProductById(req.params.id);
        return res.status(200).json({
            message: 'Product fetched successfully',
            success: true,
            data: response,
            error: {}
        });
    } catch(error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                error: error,
                success: false,
                data: {}
            });
        }
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error,
            success: false,
            data: {}
        });
    }
}


async function deleteProduct(req, res) {
    try {
        const response = await deleteProductById(req.params.id);
        return res.status(200).json({
            message: 'Product deleted successfully',
            success: true,
            data: response,
            error: {}
        });
    } catch(error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                error: error,
                success: false,
                data: {}
            });
        }
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error,
            success: false,
            data: {}
        });
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct
}
