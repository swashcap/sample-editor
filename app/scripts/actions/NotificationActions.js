'use strict';

var NotificationDispatcher = require('../dispatcher/NotificationDispatcher');

var NotificationActions = {
  addNotification: function (message, isError) {
    NotificationDispatcher.handleAction({
      actionType: 'ADD',
      message: message,
      isError: isError
    });
  },
  removeNotification: function (id) {
    NotificationDispatcher.handleAction({
      actionType: 'REMOVE',
      id: id
    });
  }
};

module.exports = NotificationActions;
