'use strict';

var React = require('react');
var Store = require('../stores/Store');
var MarkupEditor = require('./MarkupEditor');
var Notifications = require('./Notifications');
var OutputDocument = require('./OutputDocument');
var StyleEditor = require('./StyleEditor');
var $ = require('jquery');
var $window = $(window);
var $header, $footer, $wrapper, $editors;

function getState() {
  return {
    markup: Store.getMarkup(),
    styles: Store.getStyles()
  }
}

function sizer() {
  var wrapperHeight;

  if ($wrapper.length && $editors.length && $header.length && $footer.length) {
    wrapperHeight = Math.floor(
      $window.outerHeight() - $header.outerHeight() - $footer.outerHeight()
    );

    $wrapper.css('height', wrapperHeight);

    $editors.each(function (index, el) {
      var $el = $(el);
      var offsetTop = $el.position().top;

      $el.css('height', Math.floor($el.parent().height() - offsetTop));
    });
  }
}

module.exports = React.createClass({
  getInitialState: function () {
    return getState();
  },
  componentDidMount: function () {
    Store.addChangeListener(this._onChange);

    /**
     * Set heights on DOM elements.
     *
     * @todo  Figure out a better way to do layout.
     */
    $header = $('.site-header');
    $footer = $('.site-footer');
    $wrapper = $('.site-content > div');
    $editors = $('.site-content__editors .code-editor');

    sizer();
    $window.on('resize.se', sizer);
  },
  componentWillUnmount: function () {
    Store.removeChangeListner(this._onChange);

    /** @todo  Make sure this actually removes DOM references. */
    $header = $footer = $wrapper = $editors = undefined;
    $window.off('resize.se');
  },
  _onChange: function () {
    this.setState(getState());
  },
  render: function () {
    return (
      <div>
        <div className="site-content__notifications">
          <Notifications />
        </div>
        <div className="site-content__editors">
          <MarkupEditor />
          <StyleEditor />
        </div>
        <OutputDocument
          markup={this.state.markup}
          styles={this.state.styles} />
      </div>
    );
  }
});
