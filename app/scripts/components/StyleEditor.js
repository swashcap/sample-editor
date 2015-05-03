'use strict';

var React = require('react');
var CodeEditor = require('./CodeEditor');
var Actions = require('../actions/Actions');

var StyleEditor = React.createClass({
  getInitialState: function () {
    return {
      src: '',
      mode: 'sass'
    };
  },
  handleChange: function (e) {
    var self = this;

    this.setState({src: e.target.value});
    Actions.updateStyles({
      content: e.target.value,
      mode: self.state.mode
    });
  },
  changeMode: function (e) {
    this.setState({mode: e.target.value});
  },
  render: function () {
    return (
      <section className="editor">
        <header>
          <h1 className="editor__name">Styles</h1>
          <div className="editor__options">
            <label>Mode:</label>
            <select onChange={this.changeMode} value={this.state.mode}>
              <option value="css">CSS</option>
              <option value="sass">Sass</option>
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


module.exports = StyleEditor;
