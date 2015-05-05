'use strict';

var React = require('react');
var Frame = require('./Frame');

var OutputDocument = React.createClass({
  render: function () {
    return (
      <div className="output-document">
        <Frame markup={this.props.markup} styles={this.props.styles} />
      </div>
    );
  }
});

module.exports = OutputDocument;
