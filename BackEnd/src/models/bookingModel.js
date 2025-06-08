const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  gameId: { type: Number, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, default: 'USD' },
  status: { 
    type: String, 
    enum: ['created', 'completed', 'failed'], 
    default: 'created' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('Order', orderSchema);