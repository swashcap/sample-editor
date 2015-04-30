var React = require('react');
var MarkupEditor = require('./MarkupEditor');
var StyleEditor = require('./StyleEditor');
var OutputDocument = require('./OutputDocument');

module.exports = React.createClass({
  render: function () {

    return (
      <div>
        <MarkupEditor />
        <StyleEditor />
        <OutputDocument />
      </div>
    );
  }
});
