'use strict';

var React = require('react');
var CodeEditor = require('./CodeEditor');

var MarkupEditor = React.createClass({
  getInitialState: function () {
    return {
      src: '<h1>Hello!</h1>',
      mode: 'html'
    };
  },
  handleChange: function (e) {
    this.setState({src: e.target.value});
  },
  changeMode: function (e) {
    this.setState({mode: e.target.value});
  },
  render: function () {
    return (
      <section className="editor">
        <header>
          <h1 className="editor__name">Markup</h1>
          <div className="editor__options">
            <label>Mode:</label>
            <select onChange={this.changeMode} value={this.state.mode}>
              <option value="html">HTML</option>
              <option value="markdown">Markdown</option>
            </select>
          </div>
        </header>
        <CodeEditor
          value={this.state.src}
          mode={this.state.mode}
          onChange={this.handleChange} />
      </section>
    );
  }
});

module.exports = MarkupEditor;
