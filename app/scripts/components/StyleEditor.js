var React = require('react');
var CodeMirrorEditor = require('react-code-mirror')

require('codemirror/mode/css/css');

var StyleEditor = React.createClass({
  getInitialState: function () {
    return {
      src: ''
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
          <h1 className="editor__name">Styles</h1>
          <div className="editor__options">
            <label>Mode:</label>
            <select onChange={this.changeMode}>
              <option>CSS</option>
              <option>Sass</option>
            </select>
          </div>
        </header>
        <CodeMirrorEditor
          style={{border: "1px solid black"}}
          value={this.state.src}
          mode="css"
          theme="base16-dark"
          lineNumbers={true}
          onChange={this.handleChange} />
      </section>
    );
  }
});


module.exports = StyleEditor;
