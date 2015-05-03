'use strict';

var React = require('react');
var Frame = require('./Frame');

var OutputDocument = React.createClass({
  render: function () {
    return (
      <section className="output-document">
        <h1>Output</h1>
        <Frame markup={this.props.markup} styles={this.props.styles} />
      </section>
    );
  }
});

module.exports = OutputDocument;
