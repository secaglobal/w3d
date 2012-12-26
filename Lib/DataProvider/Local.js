Space.ns('Space.DataProvider');

Space.DataProvider.Local = Space.createClass({
  construct: function(conf) {
    this._records = {};
    this._recordsStack = [];

    if (conf.data) {
      for (var i = 0, record; record = conf.data[i]; ++i) {
        this._records[record.id] = record;
        this._recordsStack.push(record);
      }
    } 
  },

  find: function(id) {
    var len = arguments.length,
        filterParams = {id: []},
        stack = [];

    for (var i = 0, arg; arg = arguments[i]; ++i) {
      if (arg instanceof Array) {
        filterParams.where = arg;
      } else if (typeof arg == 'object') {
        for (var el in arg) {
          filterParams[el] = arg[el];
        }
      } else {
        filterParams.id.push(arg);
      }
    }
    
    if (filterParams.id.length) {
      for (var i = 0, id; id = filterParams.id[i]; ++i) {
        stack.push(this._records[id]);
      }
    } else {
      stack = this._recordsStack;
    }

    if (filterParams.id.length == 1 || filterParams.limit == 1) {
      return stack[0];
    } else {
      return stack;
    }
  }
});


