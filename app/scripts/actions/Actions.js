'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

var Actions = {
  updateMarkup: function (markup) {
    // console.log('updateMarkup() fired.', markup);

    AppDispatcher.handleAction({
      actionType: 'UPDATE_MARKUP',
      markup: markup
    });
  },
  updateStyles: function (styles) {
    // console.log('updateStyle() fired.', styles);

    AppDispatcher.handleAction({
      actionType: 'UPDATE_STYLES',
      styles: styles
    });
  }
};

module.exports = Actions;
