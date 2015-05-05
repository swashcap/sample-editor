'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var errorHandler = require('../utils/error-handler');
var _ = require('lodash');
var Sass = require('../utils/sass');
var Markdown = require('../utils/markdown');

// Private storage (for now)
var _markup = '';
var _styles = '';

function updateMarkup(markup) {
  _markup = markup;

  Store.emitChange();
}

function updateStyles(styles) {
  _styles = styles;

  Store.emitChange();
}

var Store = _.extend({}, EventEmitter.prototype, {
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

/**
 * Intermediate content transformation.
 *
 * @todo  This is the 'Action Transformation'. Perhaps move it to a separate
 *        file to make it easier to reason about.
 */
AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch(action.actionType) {
    case 'UPDATE_MARKUP':
      if (action.options.mode === 'markdown') {
        Markdown(action.options.content).then(function (result) {
          updateMarkup(result);
        }).catch(errorHandler);
      } else {
        updateMarkup(action.options.content);
      }

      break
    case 'UPDATE_STYLES':
      if (action.options.mode === 'sass') {
        Sass(action.options.content).then(function (result) {
          updateStyles(result);
        }).catch(errorHandler);
      } else {
        updateStyles(action.options.content);
      }

      break;
  }
});

AppDispatcher.register(_.debounce(function (payload) {
  var action = payload.action;

  switch(action.actionType === 'UPDATE_STYLES') {

  }
}, 1000));

module.exports = Store;
