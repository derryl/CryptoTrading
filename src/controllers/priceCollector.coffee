_ = require 'underscore'

Config = require '../../config'
log = console.log.bind console
Price = require '../models/price'


class PriceCollector

   constructor: ->
      WhaleClub = require('whaleclub')
      @WC = new WhaleClub(Config.WhaleClub.demoKey)
      @collectData()

   collectData: =>
      @getPrice()
      collector = setInterval( @getPrice, Config.WhaleClub.priceInterval )

   getPrice: (sym) =>
      if not sym then sym = ['BTC-USD']
      @WC.price(sym).then @processPrices

   processPrices: (prices) =>
      _.each prices, (data, symbol) =>
         data.symbol = symbol
         data.last_updated *= 1000
         @storePrice data

   storePrice: (p) ->
      Price.findOne { last_updated: p.last_updated }, (err, price) ->
         if err then console.error err
         if price
            log "Price for #{p.symbol} is up-to-date: #{p.last_updated}"
         else
            new Price( p ).save (err, result) ->
               if err then console.error err
               else
                  console.log "saved price: #{result._id}"


module.exports = PriceCollector
