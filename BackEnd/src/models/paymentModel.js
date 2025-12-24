const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
  paypalOrderId: { type: String, required: true },
  captureId: { type: String },
  status: { 
    type: String, 
    enum: ['CREATED', 'APPROVED', 'COMPLETED', 'FAILED'], 
    default: 'CREATED' 
  },
  transactionType: {
    type: String,
    enum: ['buy', 'rent'],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('Payment', paymentSchema);