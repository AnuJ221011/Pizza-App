const cloudinary = require('../config/cloudinaryConfig');
const ProductRepository = require('../repositories/productRepository');
const fs = require('fs');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {
    //1.We should check if an image is coming to create the product, then we should first upload on cloudinary
    const imagePath = productDetails.imagePath;
    if(imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url; // Use secure_url for HTTPS
            //delete the file from local storage
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
            console.log('Image uploaded to Cloudinary:', productImage);
        } catch (error) {
            console.log(error);
            throw new InternalServerError();
        }

    }

    //2. Use the url from cloudinary and other product details to add the prodcut to the database
    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });

    return product;
}

async function getProductById(productId) {
    const response = await ProductRepository.getProductById(productId);

    if(!response) {
        throw new NotFoundError('Product');
    }

    return response;
}

async function deleteProductById(productId) {
    const response = await ProductRepository.deleteProductById(productId);

    if(!response) {
        throw new NotFoundError('Product');
    }

    return response;
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}