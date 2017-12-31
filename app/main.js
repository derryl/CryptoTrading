var Config, Main, PriceCollector, log;

Config = require('../config');

log = console.log.bind(console);

PriceCollector = require('./controllers/priceCollector');

Main = (function() {
  function Main(app) {
    this.PriceCollector = new PriceCollector(app);
  }

  return Main;

})();

module.exports = Main;
