'use strict';

var Likely = __webpack_require__(18);
var config = __webpack_require__(3);
var utils = __webpack_require__(1);
var dom = __webpack_require__(2);

/**
 * @param {Node} node
 * @param {Object} options
 * @returns {Likely}
 */
var likely = function (node, options) {
  var fullOptions = options || {};
  var defaults = {
    counters: true,
    timeout: 1e3,
    zeroes: false,
    title: document.title,
    wait: 0.5e3,
    url: utils.getDefaultUrl(),
  };
  var widget = node[config.name];

  if (widget) {
    widget.update(fullOptions);
  }
  else {
    node[config.name] = new Likely(node, utils.merge(
      {}, defaults,
      fullOptions, utils.bools(node)
    ));
  }

  return widget;
};

/**
 * Initiate Likely buttons on load
 * @param {Object} [options] additional options for each widget
 */
likely.initiate = likely.initate = function (options) {
  var widgets = dom.findAll('.' + config.name);

  utils.toArray(widgets)
    .forEach(function (widget) {
      likely(widget, options);
    });
};

module.exports = likely;


/*****************
 ** WEBPACK FOOTER
 ** ./source/index.js
 ** module id = 5
 ** module chunks = 0 1
 **/