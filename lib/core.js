var w3d = {};

w3d.registerClass = function(classname, parent) {
  if (w3d[classname]) {
    throw new w3d.ClassExistsException('Class ' + classname + ' already registred');
  }
  
  w3d[classname] = w3d.createClass(parent);
}

w3d.createClass = function(params) {
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
    w3d._inherit(cl, w3d[parent]);
  } else if (typeof parent == 'function') {
    w3d._inherit(cl, parent);
  }

  for (var el in params) {
    cl.prototype[el] = params[el];
  }

  return cl;
}

w3d.unregisterClass = function() {
  for (var i = 0, arg; arg = arguments[i]; ++i) {
    delete w3d[arg];
  }
}

w3d.create = function(classname, params) {
  return new w3d[classname](params);
}

w3d._inherit = function(child, parent) {
  var F = function() { };
  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
  child.superclass = parent.prototype;
  child.self = child;
}

w3d.require = function(namespace) {
  var sequance = [[/^w3d/, 'lib'], [/\./g, '/']];
  var path = namespace;
  var loaded = 0;

  for (var i = 0, action; action = sequance[i]; ++i) {
    path = path.replace(action[0], action[1]);
  }

  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.setAttribute('src', path + '.js');
  script.setAttribute('language', 'javascript');
  script.setAttribute('type', 'text/javascript');
  head.appendChild(script);
}

w3d.ns = function(namespace) {
  var names = namespace.split('.');

  for (var i = 0, name, scope = window; name = names[i]; ++i) {
    if (!scope[name]) {
      scope[name] = {};
    }
    scope = scope[name];
  }
}

/**
 * Exceptions 
 */
w3d.Exception = function(msg) {
  this.message = msg;
};

w3d.ClassExistsException = w3d.createClass({extend: w3d.Exception});