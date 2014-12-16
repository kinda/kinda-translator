"use strict";

var KindaObject = require('kinda-object');
var Plural = require('./plural');

var Locale = KindaObject.extend('Locale', function() {
  this.setCreator(function(id, translations) {
    this.id = id;
    this.translations = translations;
  });
});

Locale.plural = function(obj) {
  return Plural.create(obj);
};

module.exports = Locale;
