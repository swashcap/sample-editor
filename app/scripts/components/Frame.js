'use strict';

/**
 * `iFrame` output component.
 *
 * @{@link  https://developer.zendesk.com/blog/rendering-to-iframes-in-react}
 */

var React = require('react');

var Frame = React.createClass({
  writeToFrame: function () {
    var styles = this.props.styles;
    var markup = this.props.markup;
    var doc = this.getDOMNode().contentDocument;

    doc.open();
    doc.write('<style>' + styles + '</style>');
    doc.write(markup);
    doc.close();
  },
  componentDidMount: function () {
    this.writeToFrame();
  },
  componentDidUpdate: function () {
    this.writeToFrame();
  },
  render: function () {
    return <iframe />
  }
});

module.exports = Frame;
