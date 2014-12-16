"use strict";

var numeral = require('numeral');
numeral.language('fr', require('numeral/languages/fr'));
var moment = require('moment');
var momentFr = require('moment/locale/fr'); // Hint for browserify

var KindaObject = require('kinda-object');

var Translator = KindaObject.extend('Translator', function() {
  this.setCreator(function(locales) {
    this.setLocales(locales);
  });

  this.getLocales = function(errorIfNoLocale) {
    if (errorIfNoLocale) {
      if (!this._locales || !this._locales.length)
        throw new Error('no locale found');
    }
    return this._locales;
  };

  this.setLocales = function(locales) {
    return this._locales = locales;
  }

  this.getCurrentLocale = function() {
    if (!this._currentLocale)
      this._currentLocale = this.getLocales(true)[0];
    return this._currentLocale;
  };

  this.setCurrentLocale = function(locale) {
    this._currentLocale = locale;
    numeral.language(locale.id);
    moment.locale(locale.id);
  };

  this.getCurrentLocaleId = function() {
    return this.getCurrentLocale().id;
  };

  this.setCurrentLocaleId = function(id) {
    var found = undefined;
    this.getLocales(true).some(function(locale) {
      if (locale.id === id) {
        found = locale;
        return true;
      }
    });
    if (!found) throw new Error('unknown locale id');
    this.setCurrentLocale(found);
  };

  this.translate = function(path, param) {
    var translation = this.getCurrentLocale().translations;
    path.split('.').forEach(function(key) {
      if (!translation.hasOwnProperty(key))
        throw new Error("translation not found (path='" + path + "')");
      translation = translation[key];
    });
    if (typeof translation === 'string') {
      if (param) {
        for (var key in param) {
          if (param.hasOwnProperty(key))
            translation = translation.replace('{' + key + '}', param[key]);
        }
      }
      return translation;
    }
    if (translation.resolve)
      return translation.resolve(param);
    throw new Error("translation not found (path='" + path + "')");
  };

  this.numeral = numeral;
  this.moment = moment;

  this.getFunction = function() {
    var boundFn =  this.translate.bind(this);
    for (var key in this) {
      if (key.substr(0, 1) !== '_') {
        var fn = this[key];
        if (typeof fn === 'function')
          boundFn[key] = fn.bind(this);
      }
    }
    boundFn.moment = moment; // strangely, moment doesn't support bind(this)
    return boundFn;
  };
});

module.exports = Translator;
