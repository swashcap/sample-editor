'use strict';

var Dispatcher = require('flux').Dispatcher;
var NotificationDispatcher = new Dispatcher();

NotificationDispatcher.handleAction = function (action) {
  this.dispatch({
    source: 'NOTIFICATION_ACTION',
    action: action
  });
};

module.exports = NotificationDispatcher;
