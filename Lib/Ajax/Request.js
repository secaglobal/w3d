Space.ns('Space.Ajax');
Space.require('Space.Ajax');
Space.require('Space.Util');

Space.Ajax.Request = Space.createClass({
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
      this.params.fullUrl += '?' + Space.Util.queryEncode(this.params.get);
    }

    this.params.method = 'GET';
  },

  send: function() {
    var handler = Space.Ajax.getRequestFactory()();
    
    handler.open(
      this.params.method,
      this.params.fullUrl,
      this.params.isAsync
    );

    handler.send(null);
  }
});