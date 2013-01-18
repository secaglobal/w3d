/**
 * Exceptions
 */
Space.Exception = function(msg) {
  this.message = msg;
};

Space.ClassExistsException = Space.Class({extend: Space.Exception});
