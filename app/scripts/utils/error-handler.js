'use strict';

/**
 * Application-level error handler.
 */

var NotificationActions = require('../actions/NotificationActions');

module.exports = function (err) {
  NotificationActions.addNotification({
    message: err.toString(),
    isError: true
  });
};
