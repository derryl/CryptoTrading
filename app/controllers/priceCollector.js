var Config, Price, PriceCollector, _, log,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

_ = require('underscore');

Config = require('../../config');

log = console.log.bind(console);

Price = require('../models/price');

PriceCollector = (function() {
  function PriceCollector() {
    this.processPrices = bind(this.processPrices, this);
    this.getPrice = bind(this.getPrice, this);
    this.collectData = bind(this.collectData, this);
    var WhaleClub;
    WhaleClub = require('whaleclub');
    this.WC = new WhaleClub(Config.WhaleClub.demoKey);
    this.collectData();
  }

  PriceCollector.prototype.collectData = function() {
    var collector;
    this.getPrice();
    return collector = setInterval(this.getPrice, Config.WhaleClub.priceInterval);
  };

  PriceCollector.prototype.getPrice = function(sym) {
    if (!sym) {
      sym = ['BTC-USD'];
    }
    return this.WC.price(sym).then(this.processPrices);
  };

  PriceCollector.prototype.processPrices = function(prices) {
    return _.each(prices, (function(_this) {
      return function(data, symbol) {
        data.symbol = symbol;
        data.last_updated *= 1000;
        return _this.storePrice(data);
      };
    })(this));
  };

  PriceCollector.prototype.storePrice = function(p) {
    return Price.findOne({
      last_updated: p.last_updated
    }, function(err, price) {
      if (err) {
        console.error(err);
      }
      if (price) {
        return log("Price for " + p.symbol + " is up-to-date: " + p.last_updated);
      } else {
        return new Price(p).save(function(err, result) {
          if (err) {
            return console.error(err);
          } else {
            return console.log("saved price: " + result._id);
          }
        });
      }
    });
  };

  return PriceCollector;

})();

module.exports = PriceCollector;
