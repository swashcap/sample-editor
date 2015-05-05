'use strict';

var React = require('react');
var CodeEditor = require('./CodeEditor');
var Actions = require('../actions/Actions');

var MarkupEditor = React.createClass({
  getInitialState: function () {
    return {
      src: '',
      mode: 'markdown'
    };
  },
  handleChange: function (e) {
    var self = this;

    this.setState({src: e.target.value});
    Actions.updateMarkup({
      content: e.target.value,
      mode: self.state.mode
    });
  },
  changeMode: function (e) {
    var mode = e.target.value;
    var content = this.state.src;

    this.setState({mode: mode});
    Actions.updateMarkup({
      content: content,
      mode: mode
    });
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
