'use strict';

var services = __webpack_require__(4);
var Factory = __webpack_require__(7);
var utils = __webpack_require__(1);

var factories = {};

/**
 * Fetch data
 *
 * @param {String} service
 * @param {String} url
 * @param {Object} options
 * @returns {Promise}
 */
module.exports = function (service, url, options) {
  if (!factories[service]) {
    factories[service] = {};
  }

  var counters = factories[service];
  var counter = counters[url];

  if (!options.forceUpdate && counter) {
    return counter;
  }

  counter = Factory();

  var href = utils.makeUrl(options.counterUrl, {
    url: url,
  });

  services[service].counter(href, counter, url);

  counters[url] = counter;
  return counter;
};


/*****************
 ** WEBPACK FOOTER
 ** ./source/fetch.js
 ** module id = 8
 ** module chunks = 0 1
 **/