'use strict';

var React = require('react');
var Frame = require('./Frame');

var OutputDocument = React.createClass({
  getInitialState: function () {
    return {
      markup: '',
      styles: ''
    };
  },
  render: function () {
    return (
      <section className="output-document">
        <h1>Output</h1>
        <Frame markup={this.state.markup} styles={this.state.styles} />
      </section>
    );
  }
});

module.exports = OutputDocument;