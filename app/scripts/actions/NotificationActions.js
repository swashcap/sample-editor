'use strict';

var NotificationDispatcher = require('../dispatcher/NotificationDispatcher');

var NotificationActions = {
  addNotification: function (notification) {
    NotificationDispatcher.handleAction({
      actionType: 'ADD',
      notification: notification
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
