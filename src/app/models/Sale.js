const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const SaleSchema = new mongoose.Schema({
  qtd_acai: {
    type: Number,
    require: true,
  },
  qtd_additional: {
    type: Number,
    require: true,
  },
  final_price: {
    type: Number,
    require: true,
  },
  acais: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Acai',
    require: true,
  }],
  additionals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Additional',
    require: true,
  }],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Sale = mongoose.model('Sale', SaleSchema);

module.exports = Sale;