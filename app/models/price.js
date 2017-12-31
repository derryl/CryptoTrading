var PriceSchema, Prices, mongoose;

mongoose = require('mongoose');

PriceSchema = new mongoose.Schema({
  symbol: {
    type: String,
    trim: true
  },
  bid: {
    type: Number
  },
  ask: {
    type: Number
  },
  last_updated: {
    type: Date
  }
});

Prices = mongoose.model('Price', PriceSchema, 'Prices');

module.exports = Prices;
