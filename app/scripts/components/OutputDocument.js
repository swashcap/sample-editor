var React = require('react');

var OutputDocument = React.createClass({
  render: function () {
    return (
      <section className="output-document">
        <h1>Output</h1>
        <iframe></iframe>
      </section>
    );
  }
});

module.exports = OutputDocument;