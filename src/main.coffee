Config = require '../config'
log = console.log.bind console

PriceCollector = require './controllers/priceCollector'

class Main

   constructor: (app) ->
      @PriceCollector = new PriceCollector(app)

module.exports = Main
