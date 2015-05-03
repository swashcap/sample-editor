'use strict';

var React = require('react');
var CodeEditor = require('./CodeEditor');

var StyleEditor = React.createClass({
  getInitialState: function () {
    return {
      src: '',
      mode: 'sass'
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
