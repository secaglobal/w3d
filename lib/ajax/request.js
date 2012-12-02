w3d.ns('w3d.ajax');
w3d.require('w3d.ajax');
w3d.require('w3d.util');

w3d.ajax.Request = w3d.createClass({
  construct: function() {
    this.params = {
      url: '/',
      get: {},
      isAsync: true,
    }

    if (arguments.length > 0) {
      for (var el in arguments[0]) {
        this.params[el] = arguments[0][el];
      }
    }

    this.params.fullUrl = this.params.url;

    if (this.params.get) {
      this.params.fullUrl += '?' + w3d.util.queryEncode(this.params.get);
    }

    this.params.method = 'GET';

  },

  send: function() {
    var handler = w3d.ajax.getRequestFactory()();
    
    handler.open(
      this.params.method,
      this.params.fullUrl,
      this.params.isAsync
    );

    handler.send(null);
  }
});