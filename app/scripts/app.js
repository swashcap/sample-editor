/**
 * Require stylesheets.
 * @{@link  http://webpack.github.io/docs/stylesheets.html}
 */
require('codemirror/lib/codemirror.css');
require('codemirror/theme/base16-dark.css');
require('../styles/main.scss');

var React = require('react');
var App = require('./components/App');

React.render(<App />, document.getElementById('app'));
