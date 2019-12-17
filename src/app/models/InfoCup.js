const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const InfoCupSchema = new mongoose.Schema({
  size_cup: {
    type: String,
    require: true,
  },
  price_cup: {
    type: Number,
    require: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  additionals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Additional',
  }],
  acai: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Acai',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InfoCup = mongoose.model('InfoCup', InfoCupSchema);

module.exports = InfoCup;