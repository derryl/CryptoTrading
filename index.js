const chalk = require('chalk');
const _ = require('underscore');

const WhaleClub = require('whaleclub');
const API_KEY = require('./auth').key;
const wc = new WhaleClub(API_KEY);

// wc.markets().then( console.log );

function getSpread(bid, ask) {
   let sigfigs = 100000;
   return Math.floor((( ask / bid ) - 1 ) * sigfigs) / (sigfigs/100);
}

function printPrices( prices ) {
  console.log(prices)
   let symbols = Object.keys( prices );
   return _.each( symbols, function(sym) {
      return printPrice( sym, prices[sym] );
   })
}

function printPrice( symbol, price ) {
   let bid = price.bid,
       ask = price.ask,
       spread = getSpread(bid, ask);

   console.log( symbol, 'bid price is $'+ bid +', ask price is $'+ ask +', with a spread of', spread + '%.');
}

wc.price(['BTC-USD']).then( printPrices );

