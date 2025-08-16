const { getCart, modifyCart, clearProductFromCart } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req, res) {
    try {
        const response = await getCart(req.user.id);
        return res.status(200).json({
            message: 'Cart fetched successfully',
            success: true,
            data: response,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                error: error,
                success: false,
                data: {}
            });
        }
        return res.status(500).json({
            message: 'Something went wrong',
            error: error,
            success: false,
            data: {}
        });
    }
}

async function modifyProductToCart(req, res) {
    try {
        const response = await modifyCart(req.user.id, req.params.productId, req.params.operation == 'add');
        return res.status(200).json({
            message: 'Product added to cart successfully',
            success: true,
            data: response,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                error: error,
                success: false,
                data: {}
            });
        }
        return res.status(500).json({
            message: 'Something went wrong',
            error: error,
            success: false,
            data: {}
        });
    }
}

async function clearCartById(req, res) {
    try {
        const response = await clearProductFromCart(req.user.id);
        return res.status(200).json({
            message: ' All Product cleared from cart successfully',
            success: true,
            data: response,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                error: error,
                success: false,
                data: {}
            });
        }
        return res.status(500).json({
            message: 'Something went wrong',
            error: error,
            success: false,
            data: {}
        });
    }
}

module.exports = {
    getCartByUser,
    modifyProductToCart,
    clearCartById
}