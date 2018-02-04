'use strict';

/**
 * @{@link  https://github.com/medialize/sass.js/}
 */

var Promise = require('rsvp').Promise;
var Sass = require('sass.js/dist/sass.js');

Sass.setWorkerUrl('sass.worker.js');

var sass = new Sass();
var isProcessing = false;

module.exports = function (text) {
  return new Promise(function (resolve, reject) {
    if (isProcessing) {
      reject('Still compiling Sass...');
    }

    try {
      isProcessing = true;
      sass.compile(text, function (result) {
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
