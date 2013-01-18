Space.require('Space.Ajax');
Space.require('Space.Util');

/**
 * Handle AJAX requests
 * @class
 * @name Space.Ajax.Request
 */
Space.Class('Space.Ajax.Request', /** @lends Space.Ajax.Request.prototype */ {
  /** @constructor
   */
  construct: function() {
    this.params = {
      url: '/',
      params: {},
      isAsync: true
    }

    if (arguments.length > 0) {
      for (var el in arguments[0]) {
        this.params[el] = arguments[0][el];
      }
    }

    this.params.method = 'GET';
  },

  /**
   * Execute request
   */
  send: function() {
    var handler = Space.Ajax.getRequestFactory()(),
        scope = this,
        fullUrl = this.params.url;

    if (this.params.params) {
      fullUrl += '?' + Space.Util.queryEncode(this.params.params);
    }

    handler.open(
      this.params.method,
      fullUrl,
      this.params.isAsync
    );

    handler.onreadystatechange = function() {
      scope._postHandle.call(scope, handler);
    }

    handler.send(null);
  },

  /**
   * Sets get/post parameter
   * @param {string} param Parameter name
   * @param {string|number|Object} value Parameter value
   */
  setParam: function(param, value) {
    this.params.params[param] = value;
  },

  /**
   * Returns all get and post parameters
   * @return {Object} Returns all get/post parameters
   */
  getParams: function() {
    return this.params.params;
  },

  /**
   * Executes callback methods
   * @private
   * @param  {Object} handler Request Handler
   */
  _postHandle: function(handler) {
    if (handler.readyState == 4) {
      var resp = false;

      try {
        if (typeof JSON == 'undefined') {
          eval('resp = ' + handler.responseText);
        } else {
          resp = JSON.parse(handler.responseText);
        }
      } catch (e) {
        resp = false;
      }

      if(handler.status < 400) {
        if (this.params.success) {
          this.params.success(resp);
        }
      } else {
        if (this.params.failur) {
          this.params.failur(handler);
        }
      }

      if (this.params.callback) {
       this.params.callback(resp, handler);
      }
    }
  },

  /**
   * Assign callback on successful result
   * @param {Function} fn Callback function
   */
  setSuccessCallback: function(fn) {
    this.params.success = fn;
  }
});