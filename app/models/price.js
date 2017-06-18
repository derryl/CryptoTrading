var PriceSchema, Prices, Schema, mongoose;

mongoose = require('mongoose');

Schema = mongoose.Schema;

PriceSchema = new Schema({
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
