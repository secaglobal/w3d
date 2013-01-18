/**
 * @class Space.DataProvider.Proxy
 */
Space.Class('Space.DataProvider.Proxy', {
  /**
   * Constructor
   * @constructor
   * @param  {[type]} conf Configuration
   */
  construct: function(conf) {
    this._request = conf.request;
    this._records = {};
  },

  /**
   * @return {Space.ActiveRecord|Array}
   */
  find: function() {
    var filter = new Space.DataProvider.RequestParser(arguments).getParams(),
        scope = this,
        single = false,
        lastParam = arguments.length ? arguments[arguments.length - 1] : false,
        fn = typeof lastParam == 'function' ? lastParam : false;

    if (filter.where) {
      if (filter.where.id && !(filter.where.id instanceof Array)) {
        single = true;
      } else if (filter.limit && filter.limit == 1) {
        single = true;
      }
    }

    this._request.setParam('action', 'list');
    this._request.setParam('filter', filter);

    this._request.setSuccessCallback(
      Space.Util.callback(this._findRequstHandler,scope, [single, fn]));

    this._request.send();
  },

  _findRequstHandler: function(single, fn, res) {
    if (res.status) {
      for (var i = 0, record; record = res.response[i]; ++i) {
        this._records[record.id] = record;
      }

      fn(single ? (res.response.length == 1 ? res.response[0] : false) : res.response);
    } else {
      fn(res.response);
    }
  }
});