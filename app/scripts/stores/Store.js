'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

// Private storage (for now)
var _markup = '';
var _styles = '';

function updateMarkup(markup) {
  _markup = markup;
}

function updateStyles(styles) {
  _styles = styles;
}

var MarkupStore = _.extend({}, EventEmitter.prototype, {
  getMarkup: function () {
    return _markup;
  },
  getStyles: function () {
    return _styles;
  },
  emitChange: function () {
    this.emit('change');
  },
  addChangeListener: function (cb) {
    this.on('change', cb);
  },
  removeChangeListener: function (cb) {
    this.removeListener('change', cb);
  }
});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch(action.actionType) {
    case 'UPDATE_MARKUP':
      updateMarkup(action.markup);
      break
    case 'UPDATE_STYLES':
      updateStyles(action.styles);
      break;
  }

  MarkupStore.emitChange();
});

module.exports = MarkupStore;
