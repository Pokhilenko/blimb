'use strict';

var likely = __webpack_require__(5);
var utils = __webpack_require__(1);

/**
 * History
 * @type {Object}
 */
var history = {
  /**
   * Called everytime the page url's been changed.
   * Reinits all widgets with the new page url.
   * @type {Function}
   */
  onUrlChange: function () {
    likely.initiate({
      forceUpdate: true,
      url: utils.getDefaultUrl(),
    });
  },
  /**
   * Inits pust/pop state events listeners
   * @type {Function}
   */
  init: function () {
    var pushState = window.history.pushState;
    window.history.pushState = function () {
      // browser should change the url first
      setTimeout(this.onUrlChange.bind(this), 0);
      return pushState.apply(window.history, arguments);
    }.bind(this);

    var replaceState = window.history.replaceState;
    window.history.replaceState = function () {
      setTimeout(this.onUrlChange.bind(this), 0);
      return replaceState.apply(window.history, arguments);
    }.bind(this);

    window.addEventListener('popstate', this.onUrlChange.bind(this));
  },
};

module.exports = history;


/*****************
 ** WEBPACK FOOTER
 ** ./source/history.js
 ** module id = 19
 ** module chunks = 0
 **/