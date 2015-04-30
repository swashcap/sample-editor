var React = require('react');
var CodeMirrorEditor = require('react-code-mirror');

/**
 * Include CodeMirror's syntax highlighting libraries through a `require`.
 * @todo  Figure out a better way to do this.
 */
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/markdown/markdown');


var MarkupEditor = React.createClass({
  getInitialState: function () {
    return {
      src: '<h1>wut</h1>',
      mode: 'htmlmixed'
    };
  },
  handleChange: function (e) {
    this.setState({src: e.target.value});
  },
  changeMode: function (e) {

  },
  render: function () {
    return (
      <section className="editor">
        <header>
          <h1 className="editor__name">Markup</h1>
          <div className="editor__options">
            <label>Mode:</label>
            <select onChange={this.changeMode}>
              <option>HTML</option>
              <option>Markdown</option>
            </select>
          </div>
        </header>
        <CodeMirrorEditor
          style={{border: "1px solid black"}}
          value={this.state.src}
          mode={this.state.mode}
          theme="base16-dark"
          lineNumbers={true}
          onChange={this.handleChange} />
      </section>
    );
  }
});

module.exports = MarkupEditor;
