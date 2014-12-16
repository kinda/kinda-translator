"use strict";

var KindaObject = require('kinda-object');

var Plural = KindaObject.extend('Plural', function() {
  this.setCreator(function(obj) {
    this.quantities = [];
    if (obj.one) {
      this.quantities[0] = obj.one;
      this.quantities[1] = obj.one;
    }
    if (obj.zero) {
      this.quantities[0] = obj.zero;
    }
    if (obj.two) {
      this.quantities[2] = obj.two;
    }
    if (obj.three) {
      this.quantities[3] = obj.three;
    }
    if (obj.four) {
      this.quantities[4] = obj.four;
    }
    if (obj.five) {
      this.quantities[4] = obj.five;
    }
    if (obj.other) {
      this.otherQuantities = obj.other;
    }
    if (obj.unknown) {
      this.unknownQuantities = obj.unknown;
    }
  });

  this.resolve = function(quantity) {
    var result = this.quantities[quantity];
    if (typeof result === 'undefined')
      if (!isNaN(quantity))
        result = this.otherQuantities;
      else
        result = this.unknownQuantities;
    return result;
  };
});

module.exports = Plural;
