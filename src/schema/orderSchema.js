const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items:[
            {
                product: {
                    type:mongoose.Schema.Type.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['ORDERED', 'DELIVERED', 'CANCELLED', 'PROCESSING', 'OUT_FOR_DELIVERY'],
        default: 'ORDERED'
    },
    address: {
        type: String,
        minLength: [10, 'Address must be at least 10 characters long'],
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'ONLINE'],
        default: 'COD'
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;