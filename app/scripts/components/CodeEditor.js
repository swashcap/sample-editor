'use strict';

/**
 * React-wrapped CodeMirror text editor.
 *
 * @{@link  https://github.com/ForbesLindesay/react-code-mirror}
 */

var React = require('react');
var CodeMirror = require('codemirror');

/**
 * Include CodeMirror's stylesheets and syntax highlighting libraries through a
 * `require`.
 *
 * @{@link  http://webpack.github.io/docs/stylesheets.html}
 *
 * @todo  Figure out a better way to do this.
 */
require('codemirror/lib/codemirror.css');
require('codemirror/theme/base16-dark.css');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/markdown/markdown');

var MODES = [{
  mode: 'text/x-scss',
  name: 'sass'
}, {
  mode: 'text/css',
  name: 'css'
}, {
  mode: 'htmlmixed',
  name: 'html'
}, {
  mode: 'markdown',
  name: 'markdown'
}];

/**
 * @todo  Figure out a better way to map `CodeEditor` props to values.
 */
function getModeFromName(name) {
  var mode;

  for (var i = 0, il = MODES.length; i < il; i++) {
    if (name === MODES[i].name) {
      mode = MODES[i].mode;
      break;
    }
  }

  return mode || '';
}

var CodeEditor = React.createClass({
  propTypes: {
    lineNumbers: React.PropTypes.bool,
    mode: React.PropTypes.string,
    onChange: React.PropTypes.func,
    theme: React.PropTypes.string,
    value: React.PropTypes.string
  },
  getDefaultProps: function () {
    return {
      lineNumbers: true,
      value: '',
      theme: 'base16-dark'
    };
  },
  componentDidMount: function () {
    var self = this;

    if ('mode' in self.props) {
      self.props.mode = getModeFromName(self.props.mode);
    }

    this.editor = CodeMirror.fromTextArea(
      self.refs.editor.getDOMNode(),
      self.props
    );
    this.editor.on('change', self.handleChange);
  },
  componentDidUpdate: function () {
    var props = this.props;

    /**
     * @todo  This only assumes only the `value` and `mode` will change. Expose
     *        getters and setters for all options.
     */
    if (this.editor) {
      if (props.value !== null && this.editor.getValue() !== props.value ) {
        this.editor.setValue(props.value);
      }

      if (props.mode !== null && this.editor.getOption('mode') !== props.mode) {
        this.editor.setOption('mode', getModeFromName(props.mode));
      }
    }
  },
  handleChange: function () {
    var editor = this.editor;
    var props = this.props;
    var value;

    if (editor) {
      value = editor.getValue();

      if (value !== props.value) {
        props.onChange && props.onChange({target: {value: value}});

        if (editor.getValue() !== props.value) {
          props.value = value;
        }
      }
    }
  },
  render: function () {
    var props = this.props;
    var editor = React.createElement('textarea', {
      ref: 'editor',
      value: props.value,
      onChange: props.onChange
    });

    return React.createElement(
      'div',
      {style: props.style, className: props.className},
      editor
    );
  }
});

module.exports = CodeEditor;
