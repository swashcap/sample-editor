'use strict';

/**
 * @{@link  https://github.com/medialize/sass.js/}
 */

var Promise = require('rsvp').Promise;
var Sass = require('sass.js/dist/sass.js');

var isProcessing = false;

Sass.initialize('sass.worker.js');

module.exports = function (sass) {
  return new Promise(function (resolve, reject) {
    if (isProcessing) {
      reject('Still compiling Sass...');
    }

    try {
      isProcessing = true;
      Sass.compile(sass, function (result) {
        isProcessing = false;
        if (result.status === 0) {
          resolve(result.text);
        } else {
          reject(result.formatted);
        }
      });
    } catch (err) {
      isProcessing = false;
      reject(err);
    }
  });
};
