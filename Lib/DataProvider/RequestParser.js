Space.ns('Space.DataProvider');

Space.DataProvider.RequestParser = Space.createClass({
  construct: function(args) {
    var len = args.length;
    var ids = [];

    this._filterParams = {};

    for (var i = 0, arg; arg = args[i]; ++i) {
      if (typeof arg == 'object') {
        if (arg.limit || arg.groupby || arg.orderby || arg.having) {
          for (var el in arg) {
            if (el == 'orderby') {
              this._filterParams.order = this._parseOrderClouse(arg.orderby);
            } else {
              this._filterParams[el] = arg[el];
            }
          }
        } else {
          if (!this._filterParams.where) {
            this._filterParams.where = {};
          }

          for (var el in arg) {
            this._filterParams.where[el] = arg[el];
          }
        }
      } else if (typeof arg == 'number' || typeof arg == 'string') { // Handle ids
        ids.push(arg);
      }
    }

    if (ids.length) {
      if (!this._filterParams.where) {
        this._filterParams.where = {};
      }

      if (this._filterParams.where.id) {
        if (this._filterParams.where.id instanceof Array) {
          for (var i = 0, id; id = this._filterParams.where.id; ++i) {
            ids.push(id);
          }
        } else {
          ids.push(this._filterParams.where.id);
        }
      }

      if (ids.length == 1) {
        this._filterParams.where.id = ids[0];
      } else {
        this._filterParams.where.id = ids;
      }
    }
  },

  getParams: function() {
    return this._filterParams;
  },

  _parseOrderClouse: function (clouse) {
    var order = [];
    var orderParts = clouse.split(',');

    for (var i = 0, part; part = orderParts[i]; ++i) {
      var matches = part.replace(/^\s+|\s+$/g, '').split(/\s+/g);
      order.push([matches[0], matches[1] && matches[1].toLowerCase() == 'desc' ? 1 : 0]);
    }

    return order;
  }
});


