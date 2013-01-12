Space.ns('Space.DataProvider');
/**
 * @class
 */
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

  find: function() {
    var stack = [];
    var filterParams = new Space.DataProvider.RequestParser(arguments).getParams();
    var ids = filterParams.where && filterParams.where.id ? 
                filterParams.where.id : false;
              
    if (ids && !(ids instanceof Array)) {
      ids = [ids];
    }
    
    if (ids && ids.length) {
      for (var i = 0, id; id = ids[i]; ++i) {
        stack.push(this._records[id]);
      }
    } else {
      stack = this._recordsStack;
    }

    // stack.filter(function(){
    //   for(var el in filterParams.where)
    // });

    if ((ids && ids.length == 1) || filterParams.limit == 1) {
      return stack[0];
    } else {
      return stack;
    }
  }
});


