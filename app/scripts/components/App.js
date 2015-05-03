'use strict';

var React = require('react');
var Store = require('../stores/Store');
var MarkupEditor = require('./MarkupEditor');
var Notifications = require('./Notifications');
var OutputDocument = require('./OutputDocument');
var StyleEditor = require('./StyleEditor');

function getState() {
  return {
    markup: Store.getMarkup(),
    styles: Store.getStyles()
  }
}

module.exports = React.createClass({
  getInitialState: function () {
    return getState();
  },
  componentDidMount: function () {
    Store.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    Store.removeChangeListner(this._onChange);
  },
  _onChange: function () {
    this.setState(getState());
  },
  render: function () {
    return (
      <div>
        <Notifications />
        <MarkupEditor />
        <StyleEditor />
        <OutputDocument
          markup={this.state.markup}
          styles={this.state.styles} />
      </div>
    );
  }
});
