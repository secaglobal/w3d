Space.ns('Space.Ajax');
Space.require('Space.Ajax');
Space.require('Space.Util');

/**
 * Handle AJAX requests
 * @class
 */
Space.Ajax.Request = Space.createClass({
  /** @constructor */
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
      scope.postHandle.call(scope, handler);
    }

    handler.send(null);
  },

  setParam: function(param, value) {
    this.params.params[param] = value;
  },

  getParams: function() {
    return this.params.params;
  },

  postHandle: function(handler) {
    if (handler.readyState == 4) {
      var resp = false;

      try {
        resp = JSON.parse(handler.responseText);
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

  setSuccessCallback: function(fn) {
    this.params.success = fn;
  }
});