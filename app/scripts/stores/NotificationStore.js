'use strict';

var NotificationDispatcher = require('../dispatcher/NotificationDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

/**
 * Store notifications as a private variable in memory.
 *
 * @todo  Figure out a better way to store notifications.
 */
var _notifications = [{
  id: 100,
  isError: true,
  message: 'There was an error compiling Sass.'
}, {
  id: 101,
  isError: false,
  message: 'Simple notification'
}];

var NotificationStore = _.extend({}, EventEmitter.prototype, {
  getNotifications: function () {
    return _notifications;
  },
  addNotification: function (notification) {
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
        message: action.message,
        isError: (action.isError ? true : false)
      })
      break;
    case 'REMOVE':
      NotificationStore.removeNotification(action.id);
      break;
  }
});

module.exports = NotificationStore;
