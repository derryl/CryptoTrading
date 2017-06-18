var Config, PriceCollector, log;

Config = require('../config');

log = console.log.bind(console);

PriceCollector = function(app) {
  var API_KEY, WhaleClub;
  WhaleClub = require('whaleclub');
  API_KEY = Config.WhaleClub.demoKey;
  this.WC = new WhaleClub(API_KEY);
  this.collectData = (function(_this) {
    return function() {
      var collector;
      return collector = setInterval(_this.getPrice, Config.WhaleClub.priceInterval);
    };
  })(this);
  this.getPrice = (function(_this) {
    return function(sym) {
      if (!sym) {
        sym = ['BTC-USD'];
      }
      return _this.WC.price(sym).then(console.log);
    };
  })(this);
  log(Config);
  this.collectData();
  return this;
};

module.exports = PriceCollector;
