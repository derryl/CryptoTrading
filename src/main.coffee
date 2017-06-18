Config = require '../config'
log = console.log.bind console

PriceCollector = (app) ->

   WhaleClub = require('whaleclub')
   API_KEY = Config.WhaleClub.demoKey

   @WC = new WhaleClub(API_KEY)

   @collectData = =>
      # console.log 'collecting data', Config.WhaleClub.priceInterval
      collector = setInterval @getPrice, Config.WhaleClub.priceInterval

   @getPrice = (sym) =>
      if not sym then sym = ['BTC-USD']
      @WC.price(sym).then console.log

   log Config
   @collectData()
   @

module.exports = PriceCollector
