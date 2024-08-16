const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            game_id: { type: String, required: true },
            game_name: { type: String, required: true },
            header_image: { type: String, required: true },
            price: { type: Number, required: true},
        },
    ],
    paymentMethod: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false},
    paidAt: { type: Date },
},
    {
        timestamps: true,
    }    
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order