var Space = {};

Space.registerClass = function(classname, parent) {
  if (Space[classname]) {
    throw new Space.ClassExistsException('Class ' + classname + ' already registred');
  }
  
  Space[classname] = Space.createClass(parent);
}

Space.createClass = function(params) {
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
    Space._inherit(cl, Space[parent]);
  } else if (typeof parent == 'function') {
    Space._inherit(cl, parent);
  }

  for (var el in params) {
    cl.prototype[el] = params[el];
  }

  return cl;
}

Space.unregisterClass = function() {
  for (var i = 0, arg; arg = arguments[i]; ++i) {
    delete Space[arg];
  }
}

Space.create = function(classname, params) {
  return new Space[classname](params);
}

Space._inherit = function(child, parent) {
  var F = function() { };
  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
  child.superclass = parent.prototype;
  child.self = child;
}

Space.require = function(namespace) {
  var sequance = [[/^Space/, 'Lib'], [/\./g, '/']];
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

Space.ns = function(namespace) {
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
Space.Exception = function(msg) {
  this.message = msg;
};

Space.ClassExistsException = Space.createClass({extend: Space.Exception});