/* global Worker */

'use strict';

/**
 * @{@link  https://github.com/medialize/sass.js/}
 * @{@link  https://github.com/evilstreak/markdown-js}
 */

var Promise = require('rsvp').Promise;

var Markdown = {
  _worker: null,
  _callbacks: {},
  _dispatch: function (options, callback) {
    options.id = 'cb' + Date.now() + Math.random();
    Markdown._callbacks[options.id] = callback;
    Markdown._worker.postMessage(options);
  },
  initialize: function (workerUrl) {
    if (Markdown._worker) {
      throw new Error('Markdown worker already initialized');
    }

    Markdown._worker = new Worker(workerUrl);
    Markdown._worker.addEventListener('message', function (event) {
      // ?
      // if (event.data.command) {
      //   Markdown[event.data.command](event.data.args);
      // }

      Markdown._callbacks[event.data.id] && Markdown._callbacks[event.data.id](event.data.result);
      delete Markdown._callbacks[event.data.id];
    }, false);
  },
  getHTML: function (markdown) {
    return new Promise(function (resolve, reject) {
      try {
        Markdown._dispatch({
          command: 'toHTML',
          payload: markdown
        }, function (result) {
          console.log(arguments);

          if (result) {
            resolve (result);
          } else {
            /** @todo  Better error handling here. */
            throw new Error('No result!')
          }
        });
      } catch (err) {
        reject (err);
      }
    });
  }
};

Markdown.initialize('markdown.worker.js');

module.exports = Markdown.getHTML;
