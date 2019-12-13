const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const AdditionalSchema = new mongoose.Schema({
  desc_additional: {
    type: String,
    require: true,
  },
  price_additional: {
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

const Additional = mongoose.model('Additional', AdditionalSchema);

module.exports = Additional;