const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const AcaiSchema = new mongoose.Schema({
  desc_cup: {
    type: String,
    require: true,
  },
  price_cup: {
    type: Number,
    require: true,
  },
  sale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sale',
    require: true,
  },
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

const Acai = mongoose.model('Acai', AcaiSchema);

module.exports = Acai;