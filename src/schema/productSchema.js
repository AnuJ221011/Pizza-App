const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minLength: [5, 'Product name must be at least 5 characters long']
    },
    description: {
        type: String,
        minLength: [5, 'Product name must be at least 5 characters long']
    },
    productImage: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['veg', 'non-veg', 'beverage', 'sides'],
        default: 'veg'
    },
    inStock: {
        type: Boolean,
        required: [true, 'In stock status is required'],
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
