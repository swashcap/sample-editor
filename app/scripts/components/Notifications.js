'use strict';

var React = require('react');
var NotificationActions = require('../actions/NotificationActions');
var NotificationStore = require('../stores/NotificationStore');

function getState() {
  return {
    notifications: NotificationStore.getNotifications()
  };
}

var Notification = React.createClass({
  getInitialState: function () {
    return getState();
  },
  componentDidMount: function () {
    NotificationStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function () {
    NotificationStore.removeChangeListener(this.onChange);
  },
  onChange: function () {
    this.setState(getState());
  },
  removeNotification: function (id) {
    NotificationActions.removeNotification(id);
  },
  render: function () {
    var self = this;

    return (
      <div>
        {this.state.notifications.map(function (notification) {
          return (
            <div className={"notification " + (notification.isError ? 'is-error' : '')}>
              <p className="notification__message">{notification.message}</p>

              <button
                onClick={self.removeNotification.bind(null, notification.id)}
                className="notification__button" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          );
        })}
      </div>
    );
  }
});

module.exports = Notification;
