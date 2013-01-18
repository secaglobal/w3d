Space.Class = function() {
  var namespace = null;
  var classname = null;
  var params = null;

  for (var i = 0, arg; arg = arguments[i]; ++i) {
    if (typeof arg == 'string') {
      var m = arg.match(/([.\w]+)\.(\w+)$/);
      if (m.length > 0) {
        if (m.length == 3) {
          namespace = m[1];
          classname = m[2];
        } else {
          classname = m[1];
        }
      }
    } else if (!params && typeof arg == 'object') {
      params = arg;
    }
  }

  if (!params) {
    params = {};
  }

  var cl = function () {
    if (this.construct) {
       this.construct.apply(this, arguments);
    }
  };

  var parent = params.extend || false;

  if (typeof parent == 'string') {
    parent = Space[parent];
  }

  Space._inherit(cl, parent);

  for (var el in params) {
    cl.prototype[el] = params[el];
  }

  if (parent) {
    for (var el in parent) {
      if (typeof parent[el] == 'function' && el != 'self') {
        Space._bindStaticMethod(parent, cl, el);
      }
    }
  }

  if (classname) {
    var holder = namespace ? Space.ns(namespace) : window;
    holder[classname] = cl;
  }

  return cl;
}