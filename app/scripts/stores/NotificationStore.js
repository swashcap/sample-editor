'use strict';

var NotificationDispatcher = require('../dispatcher/NotificationDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

/**
 * Store notifications as a private variable in memory.
 *
 * @todo  Figure out a better way to store notifications.
 */
var _notifications = [];

var MAX_NOTIFICATION_COUNT = 2;

var NotificationStore = _.extend({}, EventEmitter.prototype, {
  getNotifications: function () {
    return _notifications;
  },
  addNotification: function (notification) {
    if (_notifications.length >= MAX_NOTIFICATION_COUNT) {
      _notifications.splice(0, 1);
    }

    _notifications.push(notification);

    this.emit('change');
  },
  removeNotification: function (id) {
    _.remove(_notifications, function (notification) {
      return notification.id === id;
    });

    this.emit('change');
  },
  addChangeListener: function (cb) {
    this.on('change', cb);
  },
  removeChangeListener: function (cb) {
    this.removeListener('change', cb);
  }
});

NotificationDispatcher.register(function (payload) {
  var action = payload.action;

  switch(action.actionType) {
    case 'ADD':
      NotificationStore.addNotification({
        id: 'id' + Date.now() + Math.random(),
        message: action.notification.message,
        isError: (action.notification.isError ? true : false)
      });
      break;
    case 'REMOVE':
      NotificationStore.removeNotification(action.id);
      break;
  }
});

module.exports = NotificationStore;
