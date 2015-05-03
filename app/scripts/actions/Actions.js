'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

var Actions = {
  updateMarkup: function (options) {
    AppDispatcher.handleAction({
      actionType: 'UPDATE_MARKUP',
      options: options
    });
  },
  updateStyles: function (options) {
    AppDispatcher.handleAction({
      actionType: 'UPDATE_STYLES',
      options: options
    });
  }
};

module.exports = Actions;
