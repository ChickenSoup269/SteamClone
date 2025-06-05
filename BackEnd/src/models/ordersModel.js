const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String, required: true, ref: 'User' },
  games: [
    {
      gameId: { type: Number, required: true, ref: 'Game' },
      price: { type: Number, required: true }, 
      discount: { type: Number, default: 0 },
    },
  ],
  totalAmount: { type: Number, required: true }, 
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  promotionCode: { type: String, ref: 'Promotion' }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

orderSchema.index({ userId: 1 });
orderSchema.index({ orderId: 1 });

module.exports = mongoose.model('Order', orderSchema);