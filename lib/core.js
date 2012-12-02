var w3d = {
  classes : {},
};

w3d.registerClass = function(classname, parent) {
  w3d.classes[classname] = w3d.createClass(parent);
}

w3d.createClass = function(parent) {
  var cl = function () {};

  if (typeof parent == 'string') {
    w3d._inherit(cl, w3d.classes[parent]);
  } else if (typeof parent == 'function') {
    w3d._inherit(cl, parent);
  }
  return cl;
}

w3d.deleteClass = function(classname) {
  delete w3d.classes[classname];
}

w3d.create = function(classname, params) {
  return new w3d.classes[classname](params);
}

w3d._inherit = function(child, parent) {
  var fake = function() { }
  fake.prototype = parent.prototype
  child.prototype = new fake();
  child.prototype.constructor = child
  child.superclass = parent.prototype
}