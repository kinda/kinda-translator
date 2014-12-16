"use strict";

var Translator = require('./translator');
var config = require('kinda-config').get('kinda-translator');

var locales = [];
var localePaths = config && config.localePaths;
if (localePaths) {
  localePaths.forEach(function(path) {
    locales.push(require(path));
  });
}

var translator = Translator.create(locales);
var fn = translator.getFunction();

var KindaTranslator = {
  create: function() {
    return fn;
  }
}

module.exports = KindaTranslator;
