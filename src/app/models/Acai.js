const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const AcaiSchema = new mongoose.Schema({
  name_product: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  infocups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InfoCup',
    require: true,

    additionals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InfoCup',
      require: true,
    }],
    
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Acai = mongoose.model('Acai', AcaiSchema);

module.exports = Acai;